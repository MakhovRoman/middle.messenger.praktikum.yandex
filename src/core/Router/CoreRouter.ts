export interface CoreRouter {
    start(): void

    use(path: string, callback: () => void): CoreRouter

    go(path?: string): void

    replace(path: string): void

    back(): void

    forward(): void
}
