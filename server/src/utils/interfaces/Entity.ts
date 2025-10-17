export abstract class Entity<T> {
	constructor(
		private readonly _id: number | null,
		protected props: T
	) {}
	get id() {
		return this._id
	}
}
