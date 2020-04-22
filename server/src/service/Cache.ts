// import * as redis from 'redis';

class CacheService {

  data: Map<number, any>;

  constructor() {
    this.data = new Map();
  }

  public add(id: number, socket) {
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

  public getdata() {
    return this.data;
  }

};

export default CacheService;
