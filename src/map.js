/**
*	@file handles map objects
*/
/*	Map object	*/
function map(x, y){
		/*	set the size of the map */
		this.x = x;
		this.y = y;
		
		/*	holds linked maps */
		this.linked_map = new Array(4);
		
		/*	load a linked map to the map object */
		this.load_linked_map = (map_array) => {
			this.linked_map = map_array.map(x => x);
			};
		
		/*	this is the current map */
		this.m_map;
		
		/*	this is the background map */
		this.b_map;
		
		/*	this is the enemy map */
		this.e_map;
		
		/*	this is the sprites map */
		this.s_map;
		
		/*	give the map object a array */
		/*	it is a 2d array */
		this.m_load_map = (xs) => {
			this.m_map = xs.map(x => x.map(y => y));
			};
		
		this.b_load_map = (xs) => {
			this.b_map = xs.map(x => x.map(y => y));
			};
		
		this.e_load_map = (xs) => {
			this.e_map = xs.map(x => x.map(y => y));
			};
		
		this.s_load_map = (xs) => {
			this.s_map = xs.map(x => x.map(y => y));
			};
		
		/*	return this map object,
			mainly used for render.js */
		/*	used for player movement */
		this.m_return_map = () => {
			return (this.m_map).map(x => x.map(y => y));
			};
		
		/*	used for background */
		this.b_return_map = () => {
			return (this.b_map).map(x => x.map(y => y));
			};
		
		/*	used for enemies */
		this.e_return_map = () => {
			return (this.e_map).map(x => x.map(z => z));
			};
		
		this.s_return_map = () => {
			return (this.s_map).map(x => x.map(y => y));
			};
		
		/*	return the linked maps,
			maily used for traversal */
		this.return_linked_map = () => {
			return this.linked_map;
		};				
}

