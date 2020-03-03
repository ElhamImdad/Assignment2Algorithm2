// CPCS 324 Algorithms & Data Structures 2
// Graph data structure starter - Transitive Closure Package
// 2019, Dr. Muhammad Al-Hashimi

// -----------------------------------------------------------------------
// simple graph object with linked-list edge implementation and minimal fields
// extra vertex and edge member fields and methods to be added later as needed
//


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
	g.label = "{Exercise 8.4: 7 (Levitin, 3rd edition)}";
	g.digraph = true;
   // use global input arrays _v and _e to initialize its internal data structures
	g.read_graph(_v,_e);

   // use print_graph() method to check graph
	g.print_graph();

   // report connectivity status if available
	//var connectivity_ = g.numConnectComps;
	g.connectedComp = g.topoSearch(g.connectedComp, "dfs");
	console.log("the connectivity is?  ",g.connectedComp);
	
	//document.write("<p>dfs_push: ", g.dfs_push, "</p>");
	
	   // perform breadth-first search and output stored result
	g.topoSearch(g.connectedComp, "bfs");
	document.write("<p>bfs_order: ", g.bfs_out, "</p>");
	
   // report connectivity status if available
	console.log("the connectivity is222?  ",g.connectedComp);
	if (g.connectedComp >1 ){
		document.write("<p>DISCONNECTED  ", g.connectedComp, "</p>");
	}else if (g.connectedComp ==0){
		document.write("<p>no connectivity info </p>");
	}else if (g.connectedComp ==1){
		document.write("<p>CONNECTED </p>");
	}


	
	g.DfsTC();
	document.write("<p>TC matrix by DFS:</p>");
	for (var i = 0; i < g.dfsTC.length; i++) 
	{
		document.write(g.dfsTC[i], "</br>");

	}
	
	g.WarshallFloyd();
	document.write("<p>TC matrix by Warshall-Floyd:</p>");
	for (var i = 0; i < g.Warshall.length; i++) {
		document.write(g.Warshall[i], "</br>");
	}

	document.write("<p>DAG: ", g.isDAG(), "</br>");

	document.write("<p>Distance matrix</p>");
	for (var i = 0; i < g.Floyd.length; i++) 
	{
		document.write(g.Floyd[i], "</br>");
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
	this.dfs_push = [];
	this.bfs_out = [];
	this.label = "";

    this.connectedComp=0; 
	/**
      Graph adjacency matrix. 
	  Should be reset or recreated after changes to vertices and edges.

      @default [ ]

   */
	this.adjacencyMatrix =[]; 
	// base member methods
	
	this.read_graph = better_input;  // ... (complete next)
	this.add_edge = addEdgeImpl;
	this.print_graph = better_output;
	
	// --------------------
	// more student fields next
	this.makeAdjMatrix = makeAdjMatrix;
	this.component_P = printComponent;
	this.topoSearch = topoSearch_;
	
	// --------------------
	// more student methods next 
	this.dfsTC = [];
	/**
      Graph warshall matrix.
      @default [ ]
   */
	this.Warshall = [];
	/**
      Graph Floyed matrix.
      @default [ ]
   */
	this.Floyd = [];
	// transitive closure package (requirements in line comments, to be removed and replaced by JSDOCs) 
	
	this.hasPath = hasPathImpl;                   // boolean, true if path exists between vertices v_i, v_j in digraph
	/**
      Get the distance of shortest path in weighted graph 
      @method
   */
	this.shortestPath = shortestPathImpl;             // return distance of shortest path between v_i, v_j in weighted graph 
	/**
      Get true if acyclic digraph
      @method
   */
	this.isDAG = isDAGImpl;                    // boolean, true if acyclic digraph
	this.WarshallFloyd = WarshallFloydImpl;            // inserts .tc field in adjacency matrix if digraph, and .dist if weighted

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

function hasPathImpl(i,j)
{
	if (this.Warshall[i, j] == 1)
		return true ;
	else 
		return false;
}
//------------------
/**
   distance of shortest path between v_i, v_j in weighted graph 
   @author Elham
   @implements Graph#shortestPathImpl
   @param {number} v_i Source vertex id
   @param {number} v_j Target vertex id
*/
function shortestPathImpl(v_i, v_j) 
{
return (this.Floyd[v_i][v_j]);
}
//-----------------------
/**
   Return connected status based on internal connectivity field
   @implements Graph#isDAGImpl
   @returns {boolean} True if graph is acyclic digraph
*/
function isDAGImpl() 
{
	var i,j;
	for (i = 0, j = 0; i < this.Warshall.length && j < this.Warshall.length; i++, j++) 
	{
		if (this.hasPath(i, j)){
			return false;
		}
	}
	return true;
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
//------------------------
/**
	Apply transitive closure to Graph, the matrix stored in array #Warshall
	if digraph, and in #Floyd if weighted
   @implements {Graph#WarshallFloydImpl}

*/
 function WarshallFloydImpl() 
{ 
	this.makeAdjMatrix();

for (var i = 0; i < this.adjacencyMatrix.length; i++) 
{
	this.Floyd[i] = this.adjacencyMatrix[i].slice();
	this.Warshall[i] = this.adjacencyMatrix[i].slice();
	
	for (var j = 0; j < this.nv; j++)
	 {
		if (this.adjacencyMatrix[i][j] == 0 && (i != j)) 
		{
			this.Floyd[i][j] = Infinity;
		}
	}
}

for (var k = 0; k < this.Warshall.length; k++) 
{
	for (var i = 0; i < this.Warshall.length; i++) 
	{
		for (var j = 0; j < this.Warshall.length; j++) 
		{
			if (this.Warshall[i][j] || (this.Warshall[i][k] && this.Warshall[k][j]))
				this.Warshall[i][j] = 1;
			else 
				this.Warshall[i][j] =0;
		//	this.Warshall[i][j] = (this.Warshall[i][j] || (this.Warshall[i][k] && this.Warshall[k][j])) ? 1 : 0;
			
			this.Floyd[i][j] =
				Math.min(this.shortestPath(i, j), (this.shortestPath(i, k) + this.shortestPath(k, j)));
		}
	}
}

for (var i = 0; i < this.Floyd.length; i++)
 {
	for (var j = 0; j < this.Floyd.length; j++)
	 {
		if (this.Floyd[i][j] == Infinity) 
		{
			this.Floyd[i][j] = 0;
		}
	}
}
}

//----------------------
function makeAdjMatrix()
{
   // initially create row elements and zero the adjacency matrix
    var i,j,k,h;
	for (i = 0; i < this.nv; i++) {
		this.adjacencyMatrix[i] = [];
		for (j = 0; j < this.nv; j++) {
			this.adjacencyMatrix[i][j] = 0;
		}
		var v = this.vert[i];
		var w = v.adjacentByID();

		var weight = v.adjacent.traverse();
		
	// for each vertex, set 1 for each adjacency
		   
		for (k = 0; k < w.length; k++) {
			h= w[k];
			if (!this.weighted) {
				this.adjacencyMatrix[i][w[k]] = 1;
				
			} else {
				this.adjacencyMatrix[i][w[k]] = weight[k].weight;
			}
		}
	}//end loop for row
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

document.write("<p>GRAPH {", this.label, "} ", this.weighted ? "" : "UN", "WEIGHTED, ", this.digraph ? "" : "UN", "DIRECTED - ", this.nv, " VERTICES, ", this.ne, " EDGES:</p>");
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