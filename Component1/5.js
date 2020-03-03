// CPCS 324 Algorithms & Data Structures 2
// Graph data structure starter - Reorganized Code
// 2019, Dr. Muhammad Al-Hashimi

// -----------------------------------------------------------------------
// simple graph object with linked-list edge implementation and minimal fields
// extra vertex and edge member fields and methods to be added later as needed

// note carefully close-to-final source file organization

var _v = [], _e = [];   // globals used by standard graph reader method


// -----------------------------------------------------------------------
// global caller function, a main() for the caller page
// only function allowed to access global vars

function _main()
{
    // create a graph (default undirected)
    // note g no longer a global var
    var g = new Graph();

    // set graph properties - set a suitable label
	g.label = "GRAPH  {Figure 3.10 (Levitin, 3rd edition)}";
	g.read_graph(_v,_e);
	g.print_graph();
	g.DFS();
	document.write(g.dfsList, "</p>");
	
   // g.dfs();
	g.BFS();
	document.write("<p>", g.bfsList, "</p>");
//	g.bfs();
	//g.better_output();

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
	this.adjacentById= adjacentById;
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
	this.dfsList=[];
	this.bfsList=[];
   // --------------------
   // student property fields next

   this.label='';                // (fill) identification string to label graph


   // --------------------
   // member methods use functions defined below

   this.read_graph = better_input;  // default input reader method
    this.add_edge = add_edge;
   this.print_graph=better_output;
  this.list_vert = list_vert;    // (replace) better printer function
  
   
   this.DFS = DFS;                  // perform a depth-first search
   this.dfs = dfs;                  // DFS a connected component
   this.BFS = BFS;                  // perform a breadth-first search
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
   var i, v;
   for (i=0; i < this.nv; i++)
   {
      v = this.vert[i];
      document.write( "VERTEX: ", i, " {", v.label, "} - VISIT: ", v.visit,
         " - ADJACENCY: ", v.adjacentById(), "<br>" );
   }
   
   var j,k;
   for (j=0; j<this.dfsList.length; j++){
	   document.write(this.dfsList[j]+",");
   }
   document.write("<br>" );
   for (k=0; k<this.bfsList.length; k++){
	   document.write(this.bfsList[k]+",");
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
	   this.add_edge(e[k].u,e[k].v )
   }

	if (this.digraph==false){
		this.ne= e.length * 2;
	}
}

// --------------------
function add_edge(u_i,v_i)
{
	var id_u = this.vert[u_i];
	var id_v = this.vert[v_i];

	id_u.adjacent.insert(v_i);

	if (this.digraph==false){
		id_v.adjacent.insert(u_i);
	}
}

// --------------------
function DFS()
{
	var i;
	for (i=0; i< this.nv; i++){
		this.vert[i].visit=false;
	}

	var j;
	for (j=0; j< this.nv; j++){
		
		if (!this.vert[j].visit){
			this.dfs(j);
		}//end if
	}//end for loop

}

// --------------------
function dfs(v_i)
{
	var V;
	
	V=this.vert[v_i];
	V.visit=true;
 
	this.dfsList.push(v_i);
	 
	var y;
	y= V.adjacentById();
	var i;
	for (i=0; i<y.length; i++){
		if (!this.vert[y[i]].visit){
			this.dfs(y[i]);
		}
	} 
}

// --------------------
function BFS()
{
	var i;
	for (i=0; i< this.nv; i++){
		this.vert[i].visit=false;
	}

	var j;
	for (j=0; j< this.nv; j++){
		if (!this.vert[j].visit){
			this.bfs(j);
		}//end if
	}//end for loop
}

// --------------------
function bfs(v_i)
{
	var id_v_ = this.vert[v_i];

	id_v_.visit=true;

	var Que =new Queue();
	Que.enqueue(v_i); 

	while(!Que.isEmpty()){

		 var U = Que.dequeue();
		var u=this.vert[U];
		console.log(U,"---????-");
		this.bfsList.push(U);
		
		var y= u.adjacentById();
		var i;
		for (i=0; i<y.length; i++){
			if (this.vert[y[i]].visit==false){
				this.vert[y[i]].visit=true;
				Que.enqueue(y[i]);
				//console.log(y[i],"+++Hi++++-");
			
			}
		} 		
	} 
}


// -----------------------------------------------------------------------
// -----------------------------------------------------------------------
// --- begin student code section ----------------------------------------

function better_output()    // new default graph output method
{
	document.write( this.label, " ", this.digraph?"":"UNDIRCTED", 
	" - ",this.nv , " VERTICES, ", this.ne , " EDGES:<br><br>" );

	this.list_vert();

}

// --------------------
function adjacentById()  // initally just a wrapper for .traverse
{
	return this.adjacent.traverse();
}

