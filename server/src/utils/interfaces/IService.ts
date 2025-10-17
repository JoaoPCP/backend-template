// T is the input type, K is the output type
export interface IService<T, K> {
	execute(args: T): Promise<K>
}
