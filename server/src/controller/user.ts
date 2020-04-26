import { Like } from 'typeorm';
import { OK, CREATED } from 'http-status';
import { User } from '../entity/User';
import  AWS from 'aws-sdk';
import { DefaultContext } from 'koa';
import config from '../config';

export async function profile(ctx: DefaultContext) {
  const user = await User.findOne({ id: ctx.state.user.id });

  ctx.status = OK;
  ctx.body = { user };
};

// const generateName = (file, timestamp, format) => `${file.mimetype.split('/')[0]}/${timestamp}/${format}.${file.originalname.split('.').pop()}`;

const uploadObject = ({ buffer, file, user, timestamp }) => {
  const s3 = new AWS.S3({
    accessKeyId: config.bucket.accessKey,
    secretAccessKey: config.bucket.secretKey,
    endpoint: config.bucket.endpoint,
  });

  const params = {
      Body: buffer,
      Bucket: config.bucket.name,
      Key: `${user.id}/avatar/${timestamp}.${file.originalname.split('.').pop()}`,
      ACL: 'public-read',
      CacheControl: 'max-age=604800',
      ContentType: file.mimetype,
  };

  return s3.upload(params).promise();
};

export async function uploadAvatar(ctx: DefaultContext) {
  const { file } = ctx || ctx.request;
  const timestamp = Date.now().toString();
  const avatar = await uploadObject({ buffer: file.buffer, file, user: ctx.state.user, timestamp });

  await User.update({ id: ctx.state.user.id }, { avatar: avatar.Location });
  const user = await User.findOne(ctx.state.user.id);

  ctx.status = 200;
  ctx.body = { user };
}

// export class UserController {

//   static async all(request: Request, response: Response) {
//     const userRepository = getRepository(User);
//     const users = await userRepository.find();
//     return response.status(OK).json({ users });
//   }

//   static async one(request: Request, response: Response, next: NextFunction) {
//     try {
//       const userRepository = getRepository(User);
//       const user = await userRepository.findOne(request.params.id);
//       if (!user) {
//         return NotFoundException(response);
//       }
//       return response.status(OK).json({ user });
//     } catch (error) {
//       next(error);
//     }
//   }

//   static async profile(request: RequestExtended, response: Response, next: NextFunction) {
//     try {
//       return response.status(OK).json({ user: request.user });
//     } catch (error) {
//       next(error);
//     }
//   }

//   static async search(request: RequestExtended, response: Response, next: NextFunction) {
//     try {
//       const userRepository = getRepository(User);
//       const users = userRepository.find({ email: Like(`%${request.query.email}%`) });

//       return response.status(OK).json({ users });
//     } catch (error) {
//       next(error);
//     }
//   }

//   static async save(request: Request, response: Response, next: NextFunction) {
//     try {
//       const userRepository = getRepository(User);

//       if (await userRepository.findOne({ email: request.body.email })) {
//         return UserAlreadyExistsException(response, request.body.email);
//       }

//       const user = await userRepository.save(request.body);
//       return response.status(CREATED).json({ user });
//     } catch (error) {
//       next(error);
//     }
//   }

// }
