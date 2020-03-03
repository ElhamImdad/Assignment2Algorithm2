// CPCS 324 Algorithms & Data Structures 2
// Graph data structure starter - Transitive Closure Package
// 2019, Dr. Muhammad Al-Hashimi

// -----------------------------------------------------------------------
// simple graph object with linked-list edge implementation and minimal fields
// extra vertex and edge member fields and methods to be added later as needed
//

/**  @var {object[]} _v Input vertex objects (properties documented in {@link better_input}) */

/**  @var {object[]} _e Input edge list (documented in {@link better_input}) */
var _v = [], _e = [];   // note naming conventions in upload guide


// -----------------------------------------------------------------------
/**

   Special global program startup function for the caller page, similar to

   main() in C/C++/Java. Only function allowed to access global vars.

   @author Elham

*/
function _main()   
{
	// create a graph (default undirected)
	var g = new Graph();

   // set input graph properties (label, directed etc.)
	g.label = "{Figure 8.11 (Levitin, 3rd edition)}";
	g.digraph = true;
   // use global input arrays _v and _e to initialize its internal data structures
	g.read_graph(_v,_e);

   // use print_graph() method to check graph
	g.print_graph();

   // report connectivity status if available
	//var connectivity_ = g.numConnectComps;
	g.connectedComp = g.topoSearch(g.connectedComp, "dfs");
	console.log("the connectivity is?  ",g.connectedComp);
	
	document.write("<p>dfs_push: ", g.dfs_push, "</p>");
	

   // report connectivity status if available
	console.log("the connectivity is222?  ",g.connectedComp);
	if (g.connectedComp >1 ){
		document.write("<p>DISCONNECTED  ", g.connectedComp, "</p>");
	}else if (g.connectedComp ==0){
		document.write("<p>no connectivity info </p>");
	}else if (g.connectedComp ==1){
		document.write("<p>CONNECTED </p>");
	}

   // perform breadth-first search and output stored result

	g.topoSearch(g.connectedComp, "bfs");
	document.write("<p>bfs_order: ", g.bfs_out, "</p>");
	
	g.DfsTC();
	document.write("<p>TC matrix:</p>");
	for (var i = 0; i < g.dfsTC.length; i++) 
	{
		document.write(g.dfsTC[i], "</br>");

	}
        
}


// -----------------------------------------------------------------------

function Vertex(v)
{
	// published docs section (ref. assignment page)
	// for this section, strip line comments
	// no JSDOC comments in this section
	
	// base property fields from P1M1
	
	this.label = v.label;  // ... complete from P1M1 (remove comment)
	this.visit = false;
	this.adjacent = new List();
	
	// base member methods from P1M1
	/**
      Get id of adjacent vertices in an array.
      @method
   */
	this.adjacentByID = adjacentByID;
	this.list_vert_ = list_vert;
	// --------------------
	// more student fields next
	
	
	// --------------------
	// more student methods next
	
}

// -----------------------------------------------------------------------

function Edge(vert_i,weight)
{
	// published docs section (ref. assignment page)
	// for this section, strip line comments
	// no JSDOC comments in this section

	
	// base property fields
	
	this.target_v = vert_i;  // ... complete from P1M1 (remove comment)
	if (weight == undefined) 
	{
		this.weight = null;
	} else 
	{
		this.weight = weight;
	}
	
	// base member methods
	

	// --------------------
	// more student fields next
	
	
	// --------------------
	// more student methods next

}


// -----------------------------------------------------------------------

function Graph()
{
	// published docs section (ref. assignment page)
	// for this section, strip line comments
	// no JSDOC comments in this section
	
	
	// base property fields

	this.vert = [];
	this.nv = 0;  // ... etc. from P1M1 (remove)

	this.ne = 0;
	this.digraph = false;
	this.weighted = false;
	/**
      Array of vertex id in DFS order. Stores output of last DFS and should be
      reset or recreated after changes to vertex and edge sets.
      @default [ ]
   */
	this.dfs_push = [];
	this.bfs_out = [];
	this.label = "";

    this.connectedComp=0; 
	// base member methods
	
	this.read_graph = better_input;  // ... (complete next)
	this.add_edge = addEdgeImpl;
	this.print_graph = better_output;
	
	// --------------------
	// more student fields next
	
	
	// --------------------
	// more student methods next 

	// transitive closure package (requirements in line comments, to be removed and replaced by JSDOCs) 
	
//	this.hasPath                   // boolean, true if path exists between vertices v_i, v_j in digraph
//	this.shortestPath              // return distance of shortest path between v_i, v_j in weighted graph 
//	this.isDAG                     // boolean, true if acyclic digraph
//	this.warshallFloyd             // inserts .tc field in adjacency matrix if digraph, and .dist if weighted
   /**

      Get info about graph if connected or not
      @method

   */
	this.component_P = printComponent;
       /**
      Perform a search-like topological traversal of graph vertices. This method
      iterates on connected components, calling a specified traversal method
      (e.g., dfs) on each component, see implementing function for details
      @method
   */
	this.topoSearch = topoSearch_;
	/**
      Matrix
      @type {Array<Matrix>}
      @default [ ]
   */
	this.dfsTC = [];
	this.dfs = dfs;                 
	this.bfs = bfs;
	this.DfsTC = DfsTCMat;                   // return TC matrix for digraph based on a dfs
}


// -----------------------------------------------------------------------
// functions used by methods of Graph and ancillary objects

// -----------------------------------------------------------------------
// begin student code section
// -----------------------------------------------------------------------

// transitive closure package 

function hasPathImpl()
{

}


// -----------------------------------------------------------------------
// published docs section (ref. assignment page)
// use starter6-based P1M1 code as-is (fixes/improvements OK)
// no JSDOC comments in this section (docs already published)
// -----------------------------------------------------------------------


// --------------------
function better_input(v, e) // default graph input method
{
	this.nv=v.length;
	this.ne=e.length;
	
	var i;
	for (i=0; i<this.nv; i++){
		this.vert[i]= new Vertex(v[i]);
	}

   var k;
   for (k=0; k<this.ne; k++){
	   this.add_edge(e[k].u,e[k].v,e[k].w )
   }

	if (this.digraph==false){
		this.ne= e.length * 2;
	}
	if (!e[0].w == undefined){
		this.weighted =true;
	}

}

// --------------------
/**

   Add an edge from a vertex pair (original pre Checkpoint 6).

   @author Elham

   @implements Graph#addEdge

   @param {number} u_i Source vertex id

   @param {number} v_i Target vertex id
   @param {number} weight the weight of edge
   @var {object[]} edge 
*/

function addEdgeImpl(u_i,v_i, weight)  
{
	var id_u = this.vert[u_i];
	var id_v = this.vert[v_i];
	var edge = new Edge(v_i, weight);
	id_u.adjacent.insert(edge);

	if (this.digraph==false){
		edge = new Edge(u_i, weight);
		id_v.adjacent.insert(edge);
	}
}

// --------------------
/**

   Implement a versatile caller for search-like topological traversals of

   vertices (initially support DFS and BFS). Updates and returns the number of

   connected components .

   @author Elham

   @implements Graph#topoSearch_

   @param Comp {integer} number of connected components
   @param algorthm_type {String} type of algorithm (dfs or bfs)

   @return {integer} Number of connected components

*/
function topoSearch_(Comp, algorthm_type)
{
	var i;
	for (i = 0; i < this.nv; i++) 
	{
		this.vert[i].visit = false;
	}
	var j;
	for (j = 0; j < this.nv; j++) 
	{
			if (!this.vert[j].visit) 
			{
				if (algorthm_type == "dfs"){
					Comp++;
					this.dfs(j);
				
				}else{
					this.bfs(j);
				} 
			} 
	}
	return Comp;
}

// --------------------
/**

   Recursively traverse a connected component depth-first starting at passed

   vertex. Inserts visited vertex id in visit order in {@link #dfs_push}.

   @implements Graph#dfs

   @param {number} v_i Starting vertex id

*/
function dfs(v_i)
{
	v=this.vert[v_i];
	v.visit=true;

	this.dfs_push.push(v_i);

	var w;
	w= v.adjacentByID();
	var i;
	for (i=0; i<w.length; i++){
		if (!this.vert[w[i]].visit){
			this.dfs(w[i]);
		}
	}
}

// --------------------
/**

   Traverse a connected component breadth-first starting at passed vertex.

   Inserts visited vertex id in visit order in {@link #bfs_out}.

   @author Elham

   @implements Graph#bfs

   @param {number} v_i Starting vertex id

*/
function bfs(v_i)
{	
	var v = this.vert[v_i];

	v.visit=true;
	this.bfs_out.push(v_i);
	
	var Que =new Queue();
	Que.enqueue(v);
	

	while(!Que.isEmpty()){

		var U = Que.dequeue();
		var w= U.adjacentByID();
		
		var i;
		for (i=0; i<w.length; i++){
			if (!this.vert[w[i]].visit){
				this.vert[w[i]].visit=true;
				Que.enqueue(this.vert[w[i]]);
				this.bfs_out.push(w[i]);
				for (var h=0 ; h< this.bfs_out.length;h++ ){
					if (this.bfs_out[h] != w[i]){

					}
				}
			}
			
		}
	} 
}
// -----------------------------------------------------------------------
// -----------------------------------------------------------------------

//----------------------------
/**

   Get id of adjacent vertices in an array

   @implements {Vertex#adjacentById}

   @returns {integer[]} Array containing id of adjacent vertices in edge input order by default

*/
function adjacentByID() 
{
	var adjacentArrID = [];
	var edge_N = this.adjacent.traverse();
	var i;
	for (i = 0; i < edge_N.length; i++) {
		adjacentArrID[i] = edge_N[i].target_v;
	}
	return adjacentArrID;
}
//-------------------------
/**
	Apply dfs-based transitive closure to Graph, the matrix stored in array #dfsTC

   @implements {Graph#DfsTCMat}
*/

function DfsTCMat()
{

	for (var i = 0; i < this.nv; i++)
	{
	var v = this.vert[i];

	for (var j = 0; j < this.nv; j++) 
	{
		this.vert[j].visit = false;
	}

	this.dfsTC[i] = [];
	for (var j = 0; j < this.nv; j++) 
	{
		this.dfsTC[i][j] = 0;
	}

	var w = v.adjacentByID();
	for (var k = 0; k < w.length; k++) 
	{
		this.dfs(w[k]);
	}

	for (var h = 0; h < this.nv; h++) 
	{
		if (this.vert[h].visit) 
		{
			this.dfsTC[i][h] = 1;
		}
	}
}

}
//----------------------------
/**
	method for check connectivity

   @implements {Vertex#printComponent}

   @returns {String} connected or not

*/
function printComponent() 
{

if (this.connectedComp == 0) 
{
	return ("no connectivity info");
} else if (this.connectedComp > 1) 
{
	return ("CONNECTED");
} else if (this.connectedComp == 1)
 {
	return ("DISCONNECTED " + this.connectedComp);
}

}
//-------------

function better_output() 
{

document.write("<p>GRAPH {", this.label, "} " , this.digraph ? "" : "UN", "DIRECTED - ", this.nv, " VERTICES, ", this.ne, " EDGES:</p>");
document.write("<p> ", this.component_P(), "</p>");

// list vertices	
for (var i = 0; i < this.nv; i++) 
{
	var v = this.vert[i];
	document.write("VERTEX: ", i, v.list_vert_(), "<br>");
}
}

function list_vert()
 {

return ("{" + this.label + "} - VISIT: " + this.visit +
	" - ADJACENCY: " + this.adjacentByID());

}