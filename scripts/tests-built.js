define("Cell",[],function(){function e(e){var t,n=!1;this.setMark=function(e){n=e},this.getMark=function(){return n},this.setColor=function(e){t=e},this.getColor=function(){return t},this.setColor(e)}return e}),define("Board",["Cell"],function(e){function t(t){var n=this;n.size=0;var r=[],i=function(t){for(var i=0;i<n.size;i++){r[i]=new Array(n.size);for(var s=0;s<n.size;s++)r[i][s]=new e(t[i*n.size+s])}};if(!t)throw"no initial data";if(t.constructor!==Array)throw"invalid initial data";var s=Math.sqrt(t.length);if(s!==Math.ceil(s))throw"invalid initial data";n.size=s,i(t),n.getCellByCoords=function(e,t){return r[e][t]},n.forEach=function(e){for(var t=0;t<n.size;t++)for(var r=0;r<n.size;r++){var i=this.getCellByCoords(t,r);e(i,t,r)}},n.getCells=function(){var e=[];return n.forEach(function(t){e.push(t)}),e},n.getCellsColors=function(){var e=[];return n.forEach(function(t){e.push(t.getColor())}),e},n.getMarkedCellsCoords=function(){var e=[];return this.forEach(function(t,n,r){t.getMark()&&e.push({x:n,y:r})}),e},n.resetMarkedCells=function(){n.forEach(function(e){e.setMark(!1)})},n.getNeighboursPositions=function(e,t){var r=[{x:e-1,y:t},{x:e,y:t+1},{x:e+1,y:t},{x:e,y:t-1}],i=[];return r.forEach(function(e){var t=e;if(t.x<0||t.x>=n.size)return;if(t.y<0||t.y>=n.size)return;i.push(t)}),i},n.getDifferentNeighboursAndMarkArea=function(e,t){var i=[];return r[e][t].setMark(!0),o(e,t,i),i.forEach(function(e){var t=n.getCellByCoords(e.x,e.y);t.setMark(!1)}),i};var o=function(e,t,i){var s=r[e][t].getColor(),u=n.getNeighboursPositions(e,t);u.forEach(function(e){var t=r[e.x][e.y];if(t.getMark())return;t.setMark(!0),t.getColor()!==s?i.push(e):o(e.x,e.y,i)})}}return t}),define("StrategyBase",[],function(){function e(){var e=this,t;e.init=function(n,r){e.board=n,e.initialCoords=r,t=0},e.getStepNumber=function(){return t},e.stepForward=function(){t++},e.getNextColor=function(){return 0}}return e}),define("StrategySimple",["StrategyBase"],function(e){function t(){var e=this;e.nextStep=function(){var t=e.board.getDifferentNeighboursAndMarkArea(e.initialCoords.x,e.initialCoords.y);if(!t||t.length===0)return!1;var n=[];t.forEach(function(t){var r=e.board.getCellByCoords(t.x,t.y);n.push(r.getColor())});var r=e.getNextColor(n);return e.board.forEach(function(e){e.getMark()&&e.getColor()!==r&&e.setColor(r)}),e.board.resetMarkedCells(),e.stepForward(),!0};var t=function(e,t){for(var n=0;n<e.length;n++)if(e[n].color===t)return n;return null};e.getNeighboursColorOccurrences=function(e){var n=[];for(var r=0;r<e.length;r++){var i=e[r],s=t(n,i);s===null?n.push({color:i,occurrence:1}):n[s].occurrence=n[s].occurrence+1}return n},e.getColorMaxOccurrence=function(e){var t=null,n=0;for(var r=0;r<e.length;r++){var i=e[r];n<i.occurrence?(t=i.color,n=i.occurrence):n==i.occurrence&&i.color<t&&(t=i.color)}return t},e.getNextColor=function(t){var n=e.getNeighboursColorOccurrences(t);return e.getColorMaxOccurrence(n)}}return t.prototype=new e,t}),define("StrategyNegative",["StrategyBase"],function(e){function t(){var e=this;e.getNeighboursColors=function(t){var n=[];return t.forEach(function(t){var r=e.board.getCellByCoords(t.x,t.y);n.push(r.getColor())}),n},e.changeCellsColor=function(t){e.board.forEach(function(e){e.getMark()&&e.getColor()!==t&&e.setColor(t)})},e.nextStep=function(){var t=e.board.getDifferentNeighboursAndMarkArea(e.initialCoords.x,e.initialCoords.y);return!t||t.length===0?!1:(e.changeCellsColor(e.getNextColor(e.getNeighboursColors(t))),e.board.resetMarkedCells(),e.stepForward(),!0)};var t=function(e,t){for(var n=0;n<e.length;n++)if(e[n].color===t)return n;return null};e.getNeighboursColorOccurrences=function(e){var n=[];for(var r=0;r<e.length;r++){var i=e[r],s=t(n,i);s===null?n.push({color:i,occurrence:1}):n[s].occurrence=n[s].occurrence+1}return n},e.getColorMinOccurrence=function(e){var t=null,n=Number.MAX_VALUE;for(var r=0;r<e.length;r++){var i=e[r];n>i.occurrence?(t=i.color,n=i.occurrence):n==i.occurrence&&i.color<t&&(t=i.color)}return t},e.getNextColor=function(t){var n=e.getNeighboursColorOccurrences(t);return e.getColorMinOccurrence(n)}}return t.prototype=new e,t}),define("StrategyFactory",["StrategySimple","StrategyNegative"],function(e,t){function n(){}return n.createStrategy=function(n,r,i){var s=i?new t:new e;return s.init(n,r),s},n}),requirejs(["Board","Cell","StrategyFactory","StrategySimple","StrategyNegative"],function(e,t,n,r,i){QUnit.module("Cell"),QUnit.test("cell color saved correctly",function(e){var n=3,r=new t(n);e.equal(r.getColor(),n)}),QUnit.test("cell marking, marked",function(e){var n=new t(5);n.setMark(!0),e.ok(n.getMark())}),QUnit.module("Board"),QUnit.test("constructor not accepts empty initial data",function(t){t.throws(function(){new e})}),QUnit.test("constructor check initial data",function(t){var n=7;t.throws(function(){new e(n)})}),QUnit.test("constructor calculates dimension for correct dimension",function(t){var n=[1,2,3,3,2,3,1,2,2],r=new e(n);t.deepEqual(r.size,3)}),QUnit.test("constructor throws error on incorrect dimension",function(t){var n=[1,2,3,3,2,3,1,2,2,1];t.throws(function(){new e(n)})}),QUnit.test("constructor accepts correct data and saves correctly",function(t){var n=[1,2,3,3,2,3,1,2,2],r=new e(n);t.deepEqual(r.getCellsColors(),n)}),QUnit.test("get neighbours from all the cell sides",function(t){var n=[1,2,3,3,2,3,1,2,2],r=new e(n);t.deepEqual(r.getNeighboursPositions(1,1),[{x:0,y:1},{x:1,y:2},{x:2,y:1},{x:1,y:0}])}),QUnit.test("reset cell marks, all unmarked",function(t){var n=[1,2,3,3,2,3,1,2,2],r=new e(n),i=r.getCellByCoords(0,0);i.setMark(!0),i=r.getCellByCoords(2,2),i.setMark(!0),r.resetMarkedCells(),t.equal(r.getCellByCoords(0,0).getMark(),!1),t.equal(r.getCellByCoords(0,1).getMark(),!1),t.equal(r.getCellByCoords(0,2).getMark(),!1),t.equal(r.getCellByCoords(1,0).getMark(),!1),t.equal(r.getCellByCoords(1,1).getMark(),!1),t.equal(r.getCellByCoords(1,2).getMark(),!1),t.equal(r.getCellByCoords(2,0).getMark(),!1),t.equal(r.getCellByCoords(2,1).getMark(),!1),t.equal(r.getCellByCoords(2,2).getMark(),!1)}),QUnit.test("find neighbours of the another color, from initial corner",function(t){var n=[1,2,3,3,2,3,1,2,2],r=new e(n);t.deepEqual(r.getDifferentNeighboursAndMarkArea(0,0),[{x:0,y:1},{x:1,y:0}]),t.deepEqual(r.getMarkedCellsCoords(),[{x:0,y:0}])}),QUnit.test("find neighbours of another color, from center",function(t){var n=[1,2,3,3,2,3,1,2,2],r=new e(n);t.deepEqual(r.getDifferentNeighboursAndMarkArea(1,1),[{x:0,y:2},{x:0,y:0},{x:1,y:2},{x:2,y:0},{x:1,y:0}]),t.deepEqual(r.getMarkedCellsCoords(),[{x:0,y:1},{x:1,y:1},{x:2,y:1},{x:2,y:2}])}),QUnit.module("StrategySimple"),QUnit.test("find neighbour cells color occurrences",function(e){var t=[1,2,1,3,2,1,2,4,2],n=new r,i=n.getNeighboursColorOccurrences(t);e.deepEqual([{color:1,occurrence:3},{color:2,occurrence:4},{color:3,occurrence:1},{color:4,occurrence:1}],i)}),QUnit.test("find max color occurrence",function(e){var t=[{color:1,occurrence:3},{color:2,occurrence:4},{color:3,occurrence:1},{color:4,occurrence:1}],n=new r,i=n.getColorMaxOccurrence(t);e.equal(i,2)}),QUnit.test("find max color occurrence when several colors have the same number of occurrences",function(e){var t=[{color:1,occurrence:3},{color:2,occurrence:2},{color:3,occurrence:3},{color:4,occurrence:1}],n=new r,i=n.getColorMaxOccurrence(t);e.equal(i,1)}),QUnit.module("StrategyNegative"),QUnit.test("find neighbour cells color occurrences",function(e){var t=[1,2,1,3,2,1,2,4,2],n=new i,r=n.getNeighboursColorOccurrences(t);e.deepEqual([{color:1,occurrence:3},{color:2,occurrence:4},{color:3,occurrence:1},{color:4,occurrence:1}],r)}),QUnit.test("find min color occurrence",function(e){var t=[{color:1,occurrence:3},{color:2,occurrence:4},{color:3,occurrence:1},{color:4,occurrence:5}],n=new i,r=n.getColorMinOccurrence(t);e.equal(r,3)}),QUnit.test("find min color occurrence when several colors have the same number of occurrences",function(e){var t=[{color:1,occurrence:3},{color:2,occurrence:2},{color:3,occurrence:1},{color:4,occurrence:1}],n=new i,r=n.getColorMinOccurrence(t);e.equal(r,3)}),QUnit.test("3x3, steps according to simple strategy",function(t){var r=[1,2,3,3,2,3,1,2,2],i={x:0,y:0},s=new e(r),o=n.createStrategy(s,i);t.equal(o.getStepNumber(),0);var u;u=o.nextStep(),t.ok(u),t.equal(o.getStepNumber(),1),t.deepEqual(s.getCellsColors(),[2,2,3,3,2,3,1,2,2]),u=o.nextStep(),t.ok(u),t.equal(o.getStepNumber(),2),t.deepEqual(s.getCellsColors(),[3,3,3,3,3,3,1,3,3]),u=o.nextStep(),t.ok(u),t.equal(o.getStepNumber(),3),t.deepEqual(s.getCellsColors(),[1,1,1,1,1,1,1,1,1]),u=o.nextStep(),t.notOk(u),t.equal(o.getStepNumber(),3)}),QUnit.test("4x4 steps according to simple strategy",function(t){var r=[3,2,3,1,1,2,3,2,1,2,2,1,3,3,1,2],i={x:0,y:0},s=new e(r),o=n.createStrategy(s,i),u;u=o.nextStep(),t.ok(u),t.deepEqual(s.getCellsColors(),[1,2,3,1,1,2,3,2,1,2,2,1,3,3,1,2]),u=o.nextStep(),t.ok(u),t.deepEqual(s.getCellsColors(),[2,2,3,1,2,2,3,2,2,2,2,1,3,3,1,2]),u=o.nextStep(),t.ok(u),t.deepEqual(s.getCellsColors(),[3,3,3,1,3,3,3,2,3,3,3,1,3,3,1,2]),u=o.nextStep(),t.ok(u),t.deepEqual(s.getCellsColors(),[1,1,1,1,1,1,1,2,1,1,1,1,1,1,1,2]),u=o.nextStep(),t.ok(u),t.deepEqual(s.getCellsColors(),[2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2]),u=o.nextStep(),t.notOk(u)})}),define("tests",function(){});