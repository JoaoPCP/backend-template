export interface IRepository<T> {
	save(entity: T): Promise<T>
	findById(id: number): Promise<T | null>
	findAll(): Promise<T[]>
	update(id: number, entity: Partial<T>): Promise<T>
	delete(id: number): Promise<void>
}
