export default class Queue<T = unknown> {
	#head?: Node<T>;
	#tail?: Node<T>;
	#size: number = 0;

	constructor() {
		this.clear();
	}

	enqueue(value: T): void {
		const node = new Node(value);
		if (this.#head) {
			this.#tail!.next = node;
			this.#tail = node;
		} else {
			this.#head = node;
			this.#tail = node;
		}

		this.#size++;
	}

	dequeue(): T | undefined {
		const current = this.#head;
		if (current) {
			this.#head = this.#head?.next;
			this.#size--;
			return current.value;
		}
	}

	clear() {
		this.#head = undefined;
		this.#tail = undefined;
		this.#size = 0;
	}

	get size() {
		return this.#size;
	}

	* [Symbol.iterator]() {
		let current = this.#head;
		while (current) {
			yield current.value;
			current = current.next;
		}
	}
}

class Node<T = any> {
	value: T;
	next?: Node<T>;
	constructor(value: T) {
		this.value = value;
	}
}
