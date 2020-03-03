// CPCS 324 Algorithms & Data Structures 2
// Graph data structure starter - First Edge Object
// 2019, Dr. Muhammad Al-Hashimi
//Elham1779096
// -----------------------------------------------------------------------
// simple graph object with linked-list edge implementation and minimal fields
// extra vertex and edge member fields and methods to be added later as needed
//

var _v = [], _e = [];   // globals used by standard graph reader method


// -----------------------------------------------------------------------
// global caller function, a main() for the caller page
// only function allowed to access global vars

function _main()
{
   // create a graph (default undirected)
	var g = new Graph();

   // set input graph properties (label, directed etc.)
	g.label = "{Figure 3.10 (Levitin, 3rd edition)}";

   // use global input arrays _v and _e to initialize its internal data structures
	g.read_graph(_v,_e);

   // use print_graph() method to check graph
	g.print_graph();

   // report connectivity status if available
	console.log("the connectivity is?  ",g.numConnectComps);
	if (g.numConnectComps != 0){
		document.write("<p>DISCONNECTED  ", g.numConnectComps, "</p>");
	}else{
		document.write("<p>no connectivity info </p>");
	}

   // perform depth-first search and output stored result
	//g.topoSearch("dfs");
	g.numConnectComps= g.topoSearch(g.numConnectComps, "dfs");
	document.write("<p>dfs_push: ", g.dfs_push, "</p>");
   // report connectivity status if available

	if (g.numConnectComps != 0){
		document.write("<p>DISCONNECTED ", g.numConnectComps, "</p>");
	}else{
		document.write("<p>no connectivity info </p>");
	}

   // perform breadth-first search and output stored result
	//g.topoSearch("bfs");
	g.topoSearch(g.connectedComp, "bfs");
	document.write("<p>bfs_out: ", g.bfs_out, "</p>");
   // output the graph adjacency matrix
	g.makeAdjMatrix();
	document.write("<p>first row matrix: ", g.adjacencyMatrix[0], "</p>");
	document.write("<p>last row matrix: ", g.adjacencyMatrix[g.nv - 1], "</p>");
}


// -----------------------------------------------------------------------
// Vertex object constructor

function Vertex(v)
{
   // user input fields

   this.label = v.label;          // vertex can be labelled

   // more fields to initialize internally

   this.visit = false;            // vertex can be marked visited or "seen"
   this.adjacent = new List();    // init an adjacency list

   // --------------------
   // member methods use functions defined below

   this.adjacentByID= adjacentByID;                              // return target id of incident edges in array

}

// -----------------------------------------------------------------------
// Edge object constructor
function Edge() 
{
this.tg_vert;
this._weight;
}


// -----------------------------------------------------------------------
// Graph object constructor

function Graph()
{
   this.vert = [];                // vertex list (an array of Vertex objects)
   this.nv;                       // number of vertices
   this.ne;                       // number of edges
   this.digraph = false;          // true if digraph, false otherwise (default undirected)
   this.dfs_push = [];            // DFS order output
   this.bfs_out = [];             // BFS order output
   this.label = "";               // identification string to label graph

   // --------------------
   // student property fields next
	this.weighted=false;
    this.numConnectComps=0;                                // number of connected comps set by DFS; 0 (default) for no info
    this.adjacencyMatrix =[];                              // graph adjacency matrix to be created on demand


   // --------------------
   // member methods use functions defined below

   this.read_graph = better_input;   // default input reader method

   this.print_graph = better_output; // better printer function
   this.list_vert = list_vert;

   this.add_edge2 = add_edge2;        // replace (don't change old .add_edge)
 //  this.add_edge = add_edge;  
   
                                       // perform a topological search
	this.makeAdjMatrix = makeAdjMatrix;
	this.topoSearch = topoSearch;
	
	
   this.dfs = dfs;                  // DFS a connected component
   this.bfs = bfs;                  // BFS a connected component

   // --------------------
   // student methods next; implementing functions in student code section at end

}


// -------------------------------------------------------
// Functions used by methods of Graph object. Similar to
// normal functions but use object member fields and
// methods, depending on which object is passed by the
// method call through the self variable: this.
//

// --------------------
function list_vert()
{
   var i, v;  // local vars
   for (i=0; i < this.nv; i++)
   {
      v = this.vert[i];
      document.write( "VERTEX: ", i, " {", v.label, "} - VISIT: ", v.visit,
         " - ADJACENCY: ", v.adjacentByID(), "<br>" );
   }
}

// --------------------
function better_input(v,e)
{
	this.nv=v.length;
	this.ne=e.length;

	var i;
	for (i=0; i<this.nv; i++){
		this.vert[i]= new Vertex(v[i]);
	}

   var k;
   for (k=0; k<this.ne; k++){
	   this.add_edge2(e[k].u,e[k].v,e[k].w )
   }

	if (this.digraph==false){
		this.ne= e.length * 2;
	}
	if (!e[0].w == undefined){
		this.weighted =true;
	}
}

// --------------------
function better_output()
{
   document.write("<p>GRAPH {",this.label, "} ", this.weighted ? "" : "UN", "WEIGHTED, ", this.digraph?"":"UN", "DIRECTED - ", this.nv, " VERTICES, ",
      this.ne, " EDGES:</p>");

   // list vertices
   this.list_vert();
}

// --------------------
function add_edge(u_i,v_i)   // obsolete, replaced by add_edge2() below
{
	var id_u = this.vert[u_i];
	var id_v = this.vert[v_i];

	id_u.adjacent.insert(v_i);

	if (this.digraph==false){
		id_v.adjacent.insert(u_i);
	}
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
			//var s = this.vert[w[i]];
			if (!this.vert[w[i]].visit){
				this.vert[w[i]].visit=true;
				Que.enqueue(this.vert[w[i]]);
				this.bfs_out.push(w[i]);
				for (var h=0 ; h< this.bfs_out.length;h++ ){
					if (this.bfs_out[h] != w[i]){
					//	this.bfs_out.push(w[i]);
				//	console.log(w[i],"+++Hi++++-");
					}
				}
			}
			
		}
	} 
}
// -----------------------------------------------------------------------
// -----------------------------------------------------------------------
// --- begin student code section ----------------------------------------

function adjacentByID()
{
	var adjacentArrID = [];
	var edge_N = this.adjacent.traverse();
	var i;
	for (i = 0; i < edge_N.length; i++) {
		adjacentArrID[i] = edge_N[i].tg_vert;
	}
	return adjacentArrID;

}

// --------------------
function add_edge2(u_i,v_i, w)
{
    // fetch vertices using their id, where u: edge source vertex, v: target vertex
	var u = this.vert[u_i];
	var v = this.vert[v_i];

   // insert (u,v), i.e., insert v in adjacency list of u
   // (first create edge object using v_i as target, then pass object)
	var edge = new Edge();
	edge.tg_vert = v_i;
	
	if (!(w == undefined)) 
	{
		edge._weight = w;
	}
	u.adjacent.insert(edge);

   // insert (v,u) if undirected graph (repeat above but reverse vertex order)
	if (this.digraph==false){
		edge = new Edge();
		edge.tg_vert = u_i;
		if (!(w == undefined)) 
		{
			edge.weight = w;
		}
		v.adjacent.insert(edge);
	}
}

// --------------------
function topoSearch(Comp, algorthm_type)
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
