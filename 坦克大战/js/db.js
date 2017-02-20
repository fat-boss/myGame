
var spans=$('#grade span');
// console.log(spans.length);
var scoreArray=[];


function saveScore(){
	// console.log("1111")
	db.transaction(function(tx){
		tx.executeSql('create table if not exists t_score (score int)');
		tx.executeSql('insert into t_score(score) values (?)',[Score]);
	})
}

function showScore(){
	db.transaction(function(tx){
		tx.executeSql('select distinct * from t_score order by score desc limit 0,3',[],function(tx,rs){
			// console.log(rs.rows.length)
			var len=rs.rows.length;
			var i;
			for(i=0;i<len;i++){
				scoreArray.push(rs.rows.item(i).score);
				// console.log(rs.rows.item(i).score)
			}
			for(var i=0;i<spans.length;i++){
				spans.eq(i).html(scoreArray[i]);
				// console.log(scoreArray[i])
			}

		},function(tx,err){
			console.log(err);
		})
	})
}


