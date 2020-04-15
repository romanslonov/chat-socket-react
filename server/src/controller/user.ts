import { getRepository, Like } from 'typeorm';
import { OK, CREATED } from 'http-status';
import { User } from '../entity/User';

import { DefaultContext } from 'koa';

export async function profile(ctx: DefaultContext) {
  const user = await User.findOne({ id: ctx.state.user.id });

  ctx.status = OK;
  ctx.body = { user };
};

export async function search(ctx: DefaultContext) {
  const users = await User.find({
    email: Like(`%${ctx.request.query.email}%`),
  });

  // const users = await User
  //   .createQueryBuilder('user')
  //   .where('user.email like :email', { email: '%' + ctx.request.query.email + '%' })
  //   .andWhere('user.email not like :email', { email: '%' + ctx.state.user.email + '%' })
  //   .getMany();

  ctx.status = OK;
  ctx.body = { users };
};

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
