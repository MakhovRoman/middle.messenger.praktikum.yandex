export class BaseAPI {
    create: (obj: Record<string, unknown>) => Promise<unknown> = () =>  { throw new Error('Not implement'); }

    request() { throw new Error('Not implement'); }

    update() { throw new Error('Not implement'); }

    delete() { throw new Error('Not implement'); }
}
