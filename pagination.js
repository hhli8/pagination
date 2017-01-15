var Pagination={
	fun:'',
	p:'', //显示的最大页数,显示规则——奇数
	init:function(box,do_what){
		//ajax //page=1
		Pagination.fun('选项',1,'key',do_what);
		
		if(!$(box).find('.pagination').html()){
			var pageTotal=16,//最大分页数——根据ajax结果设置
				TOTAL;
			var html='<ul><li><button paged="1" class="ch no">首页</button></li><li><button class="move no moverPrev"><</button></li>';
			TOTAL=pageTotal<Pagination.p+1?pageTotal:Pagination.p;  
			for(let i=0;i<TOTAL;i++){
				html+='<li><button '+(i==0?'class="btnAct"':'')+' paged="'+(i+1)+'">'+(i+1)+'</button></li>';
			}
			html+='<li><button paged="'+pageTotal+'" class="ch no">尾页</button></li><li><button class="move no moveNext">></button></li><li>&nbsp;&nbsp;跳至 <input type="text" value="1"/> 页</li><li><button class="no chosePage">跳转</button></li></ul>';
			$(box).find('.pagination').append(html);
		}
	},
	tofirst:function(the,fun){
		if(the.find('input').val()!=1){
			var TOTAL=the.find('.ch:eq(1)').attr('paged');
			the.find('.btnAct').removeClass('btnAct');			
			var nNo=the.find('button:not(.no)');
			for(var i=0;i<nNo.length;i++){
				$(nNo[i]).attr('paged',i+1);
				$(nNo[i]).text(i+1);
			}			
			the.find('button:not(.no):first').addClass('btnAct');
			the.find('input').val(1);
			//ajax //page=1
			fun('选项',1,'key',the.parent().attr('type'));
		}
	},
	tolast:function(the,fun){
		var TOTAL=the.find('.ch:eq(1)').attr('paged');  
		if(the.find('input').val()!=TOTAL){
			the.find('.btnAct').removeClass('btnAct');
			var nNo=the.find('button:not(.no)');
			if(TOTAL<Pagination.p+1){
				for(var i=0;i<nNo.length;i++){
					$(nNo[i]).attr('paged',i+1);$(nNo[i]).text(i+1);
				}	
			}else{  
				var thistotal=TOTAL;
				var six=Pagination.p-1;
				while(six>-1){
					$(nNo[six]).attr('paged',thistotal);$(nNo[six]).text(thistotal);
					thistotal--;
					six--;
				}
			}
			the.find('button:not(.no):last').addClass('btnAct');
			the.find('input').val(TOTAL);
			//ajax //page=TOTAL
			fun('选项',TOTAL,'key',the.parent().attr('type')); 
		}
	},
	prev:function(the,fun){
		var now=the.find('.btnAct').attr('paged');
		if(now==1){return;}
		the.find('input').val(parseInt(now)-1);
		var nNo=the.find('button:not(.no)');
		var nNoFirst=$(nNo[0]).attr('paged');
		var PREV=the.find('.btnAct').parent().prev().find('button');
		if(parseInt(now)==parseInt(nNoFirst)){
			for(var i=0;i<Pagination.p;i++){
				var own=$(nNo[i]).attr('paged');
				$(nNo[i]).attr('paged',(own-1));$(nNo[i]).text(own-1);
			}
		}else{
			the.find('.btnAct').removeClass('btnAct');
			PREV.addClass('btnAct');
		}
		//ajax
		fun('选项',parseInt(now)-1,'key',the.parent().attr('type'));//page=parseInt(now)-1
	},
	next:function(the,fun){
		var TOTAL=the.find('.ch:eq(1)').attr('paged');
		var now=the.find('.btnAct').attr('paged');
		if(now==TOTAL){return;}
		//input
		the.find('input').val(parseInt(now)+1);
		var nNo=the.find('button:not(.no)');
		var nNoLast=$(nNo[nNo.length-1]).attr('paged');
		var NEXT=the.find('.btnAct').parent().next().find('button');
		if(parseInt(now)==parseInt(nNoLast)){
			for(var i=0;i<Pagination.p;i++){
				var own=$(nNo[i]).attr('paged');
				$(nNo[i]).attr('paged',(parseInt(own)+1));$(nNo[i]).text(parseInt(own)+1);
			}
		}else{
			the.find('.btnAct').removeClass('btnAct');
			NEXT.addClass('btnAct');
		}
		//ajax
		fun('选项',parseInt(now)+1,'key',the.parent().attr('type'));//page=parseInt(now)+1
	},
	page:function(the,fun,This){
		var page=parseInt($(This).attr('paged'));
		if(page==parseInt(the.find('.btnAct').text())){return;}
		the.find('.btnAct').removeClass('btnAct');	
		$(This).addClass('btnAct');
		the.find('input').val(page);
		//ajax
		fun('选项',page,'key',the.parent().attr('type'));//page=page
	},
	inputEnter:function(the,fun){
		var page=parseInt(the.find('input').val());
		if(page==parseInt(the.find('.btnAct').text())){return;}
		var TOTAL=parseInt(the.find('.ch:eq(1)').attr('paged'));
		if(page<1||page>TOTAL){alert('您输入的页数超过范围！');return;}
		if(!page){alert('请输入页数！');return;}
		var nNo=the.find('button:not(.no)');
		the.find('.btnAct').removeClass('btnAct');	
		if(TOTAL<Pagination.p+1){
			$(nNo[page-1]).addClass('btnAct');
		}else{
			var half=(Pagination.p-1)/2;
			if(page>TOTAL-half){
				var thistotal=TOTAL;
				var six=Pagination.p-1;
				while(six>-1){
					$(nNo[six]).attr('paged',thistotal);$(nNo[six]).text(thistotal);
					if(page==thistotal){$(nNo[six]).addClass('btnAct');}
					thistotal--;
					six--;
				}
			}else if(page<=half){
				for(var i=0;i<nNo.length;i++){
					$(nNo[i]).attr('paged',i+1);
					$(nNo[i]).text(i+1);
					if(page==i+1){$(nNo[i]).addClass('btnAct');}
				}	
			}else{
				var f=-half;   
				for(var i=0;i<Pagination.p;i++){
					$(nNo[i]).attr('paged',(page+f));
					$(nNo[i]).text((page+f));
					if(f==0)$(nNo[i]).addClass('btnAct');
					f++;
				}
				f='';
			}
		}
		//ajax
		fun('选项',page,'key',the.parent().attr('type'));//page=page
	}
}
//选择type的时候清空pagination--$(e).html('')——注


$('.pagination').on('click','.ch:eq(0)',function(){
	var the=$(this).parent().parent();
	Pagination.tofirst(the,Pagination.fun);
});
$('.pagination').on('click','.ch:eq(1)',function(){
	var the=$(this).parent().parent();
	Pagination.tolast(the,Pagination.fun);
});
$('.pagination').on('click','.moverPrev',function(){
	var the=$(this).parent().parent();
	Pagination.prev(the,Pagination.fun);
});
$('.pagination').on('click','.moveNext',function(){
	var the=$(this).parent().parent();
	Pagination.next(the,Pagination.fun);
});
$('.pagination').on('click','button:not(.no)',function(){
	var the=$(this).parent().parent();
	var This=this;
	Pagination.page(the,Pagination.fun,This);
});
$('.pagination').on('keydown','input',function(e){
	if(e.which==13){
		var the=$(this).parent().parent();
		Pagination.inputEnter(the,fun);
	}
});
$('.pagination').on('click','.chosePage',function(){	
	var the=$(this).parent().parent();
	Pagination.inputEnter(the,Pagination.fun);
});	
	





