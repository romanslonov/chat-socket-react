// import * as redis from 'redis';

class CacheService {

  data: Map<number, SocketIO.Socket>;

  constructor() {
    this.data = new Map();
  }

  public add(id: number, socket: SocketIO.Socket) {
    this.data.set(id, socket);
  }

  public get(id: number) {
    return this.data.get(id);
  }

  public delete(id: number) {
    this.data.delete(id);
  }

  public count(): number {
    return this.data.size;
  }

  public getdata(): Map<number, SocketIO.Socket> {
    return this.data;
  }

};

export default CacheService;
