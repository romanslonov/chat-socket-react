<template>
  <div v-if="channel">
    <div class="flex flex-col items-center justify-center p-4 border-b">
      <v-avatar
        width="80"
        height="80"
        :name="channelUser.name"
        :id="channelUser.id"
        :url="channelUser.avatar"
        :status="channelUser.status"
      />
      <h2 class="truncate text-xl font-bold">{{ channelUser.name }}</h2>
      <div class="truncate text-gray-600 mb-2">{{ channelUser.email }}</div>

      <button @click="startCall" class="bg-black text-white rounded px-4 h-8">Call</button>
    </div>
    <div class="bg-gray-200 p-4">
      <video autoplay playsinline ref="video"></video>
    </div>
  </div>
</template>

<script>
import VAvatar from '@/components/Avatar.vue';
import bus from '@/bus';

const Events = {
  CHANNEL_TYPING: 'CHANNEL_TYPING',
  CALL_SDP: 'CALL_SDP',
  CALL_START: 'CALL_START',
  CALL_STARTED: 'CALL_STARTED',
  CALL_SEND_OFFER: 'CALL_SEND_OFFER',
  CALL_GET_OFFER: 'CALL_GET_OFFER',
  CALL_SEND_ANSWER: 'CALL_SEND_ANSWER',
  CALL_GET_ANSWER: 'CALL_GET_ANSWER',
  CALL_SEND_CANDIDATE: 'CALL_SEND_CANDIDATE',
  CALL_GET_CANDIDATE: 'CALL_GET_CANDIDATE',
};

export default {
  data: () => ({
    connection: null,
    myMediaStream: null,
  }),
  computed: {
    user() {
      return this.$store.getters['user/profile'];
    },
    channel() {
      return this.$store.getters['channels/list'].find((c) => c.id === Number(this.$route.params.id));
    },
    channelUser() {
      return this.channel.users.find((u) => u.id !== this.user.id);
    },
  },
  sockets: {
    [Events.CALL_STARTED](payload) {
      bus.$emit('modal.open', {
        title: 'Incoming voice call',
        props: { callerId: payload.callerId },
        onClose: async () => {
          this.answerCall(payload.offer);
          window.console.log('[app]: Answer on voice call');
        },
        onDismiss: async () => {
          this.declineCall();
          window.console.log('[app]: Declined this voice call');
        },
        component: () => import('@/components/modals/VoiceCall.vue'),
      });
    },
    async [Events.CALL_GET_CANDIDATE](payload) {
      if (this.connection && payload.candidate) {
        await this.connection.addIceCandidate(new RTCIceCandidate(payload.candidate));
      }
    },
    async [Events.CALL_GET_ANSWER](payload) {
      await this.connection.setRemoteDescription(
        new RTCSessionDescription(payload.answer),
      );
    },
  },
  created() {},
  methods: {
    initConnection() {
      const configuration = {
        offerToReceiveAudio: true,
        offerToReceiveVideo: true,
        iceServers: [{ urls: 'stun:stun.1.google.com:19302' }],
      };

      this.connection = new RTCPeerConnection(configuration);

      this.connection.onicecandidate = ({ candidate }) => {
        this.$socket.client.emit(Events.CALL_SEND_CANDIDATE, {
          candidate,
          target: this.channelUser.id,
        });
      };

      // this.connection.oniceconnectionstatechange = () => {
      //   switch (this.connection.iceConnectionState) {
      //     case 'disconnected':
      //     case 'failed':
      //       console.log('Ice connection state is failed/disconnected');
      //       break;

      //     case 'closed':
      //       console.log("Ice connection state is 'closed'");
      //       break;

      //     default:
      //   }
      // };

      // this.connection.onsignalingstatechange = () => {
      //   switch (this.connection.signalingState) {
      //     case 'closed':
      //       console.log("Signalling state is 'closed'");
      //       break;
      //     default:
      //   }
      // };

      this.connection.ontrack = (event) => {
        const remoteVideo = this.$refs.video;
        if (remoteVideo.srcObject) return;
        // eslint-disable-next-line prefer-destructuring
        remoteVideo.srcObject = event.streams[0];
      };
    },
    async startCall() {
      this.initConnection();

      this.setLocalMedia();

      const offer = await this.connection.createOffer();
      await this.connection.setLocalDescription(offer);

      this.$socket.client.emit(Events.CALL_START, {
        offer,
        target: this.channelUser.id,
      });
    },
    async answerCall(offer) {
      this.initConnection();
      await this.connection.setRemoteDescription(new RTCSessionDescription(offer));
      const answer = await this.connection.createAnswer();
      this.$socket.client.emit(Events.CALL_SEND_ANSWER, {
        answer,
        target: this.channelUser.id,
      });
      this.setLocalMedia();
    },
    declineCall() {},
    setLocalMedia() {
      navigator
        .mediaDevices
        .getUserMedia({ audio: true, video: true })
        .then((myStream) => {
          this.$refs.video.srcObject = myStream;

          myStream.getTracks().forEach((track) => {
            this.connection.addTrack(track, myStream);
          });

          this.myMediaStream = myStream;
        });
    },
  },
  components: { VAvatar },
};
</script>
