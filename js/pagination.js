var Pagination={
	keyword:'',
	pageTotal:'',//总共页数(必选，在init前)
	isCountShow:false,
	count:'',//每页加载的数量量
	fun:'',//数据请求
	p:'', //显示的可跳转的最多页数,显示规则——奇数
	init:function(box){
		//ajax //page=1
		//Pagination.fun('选项',1,'key',do_what);
		if(!$(box).find('.pagination').html()){
			var pageTotal=Pagination.pageTotal,
				TOTAL;
			var html='<ul><li><button paged="1" class="ch no">首页</button></li><li><button class="move no moverPrev"><</button></li>';
			TOTAL=pageTotal<Pagination.p+1?pageTotal:Pagination.p;  
			for(var i=0;i<TOTAL;i++){
				html+='<li><button '+(i==0?'class="btnAct"':'')+' paged="'+(i+1)+'">'+(i+1)+'</button></li>';
			}
			var countbox=Pagination.isCountShow?('<li>每页最大数据<input type="text" class="maxData" value="'+Pagination.count+'"/>条</li><li><button class="no maxData-submit">确定</button></li>'):'';
			html+='<li><button paged="'+pageTotal+'" class="ch no">尾页</button></li><li><button class="move no moveNext">></button></li><li>&nbsp;&nbsp;跳至 <input type="text" value="1" class="inPage"/> 页</li><li><button class="no chosePage">跳转</button></li>'+countbox+'</ul>';                                       
			$(box).find('.pagination').append(html);
		}
	},
	tofirst:function(the){
		if(the.find('input').val()!=1){
			var TOTAL=the.find('.ch:eq(1)').attr('paged');
			the.find('.btnAct').removeClass('btnAct');			
			var nNo=the.find('button:not(.no)');
			for(var i=0;i<nNo.length;i++){
				$(nNo[i]).attr('paged',i+1);
				$(nNo[i]).text(i+1);
			}			
			the.find('button:not(.no):first').addClass('btnAct');
			the.find('input.inPage').val(1);
			//ajax //page=1
			//fun('选项',1,'key',the.parent().attr('type'));
			Pagination.fun(1,Pagination.keyword,Pagination.count);
		}
	},
	tolast:function(the){
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
			the.find('input.inPage').val(TOTAL);
			//ajax //page=TOTAL
			//fun('选项',TOTAL,'key',the.parent().attr('type')); 
			var page=TOTAL;
			Pagination.fun(page,Pagination.keyword,Pagination.count);
		}
	},
	prev:function(the){
		var now=the.find('.btnAct').attr('paged');
		if(now==1){return;}
		the.find('input.inPage').val(parseInt(now)-1);
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
		//fun('选项',parseInt(now)-1,'key',the.parent().attr('type'));//page=parseInt(now)-1
		var page=parseInt(now)-1;
		Pagination.fun(page,Pagination.keyword,Pagination.count);
	},
	next:function(the){
		var TOTAL=the.find('.ch:eq(1)').attr('paged');
		var now=the.find('.btnAct').attr('paged');
		if(now==TOTAL){return;}
		the.find('input.inPage').val(parseInt(now)+1);
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
		//fun('选项',parseInt(now)+1,'key',the.parent().attr('type'));//page=parseInt(now)+1
		var page=parseInt(now)+1;
		Pagination.fun(page,Pagination.keyword,Pagination.count);
	},
	page:function(the,This){
		var page=parseInt($(This).attr('paged'));
		if(page==parseInt(the.find('.btnAct').text())){return;}
		the.find('.btnAct').removeClass('btnAct');	
		$(This).addClass('btnAct');
		the.find('input.inPage').val(page);
		//ajax
		//fun('选项',page,'key',the.parent().attr('type'));//page=page
		Pagination.fun(page,Pagination.keyword,Pagination.count);
	},
	inputEnter:function(the){
		var page=parseInt(the.find('input.inPage').val());
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
		//fun('选项',page,'key',the.parent().attr('type'));//page=page
		Pagination.fun(page,Pagination.keyword,Pagination.count);
	}
}
//选择type的时候清空pagination--$(e).html('')——注
$('.pagination').on('click','.ch:eq(0)',function(){
	var the=$(this).parent().parent();
	Pagination.keyword=$('.search-box .search-key').val();
	Pagination.tofirst(the);
});
$('.pagination').on('click','.ch:eq(1)',function(){
	var the=$(this).parent().parent();
	Pagination.keyword=$('.search-box .search-key').val();
	Pagination.tolast(the);
});
$('.pagination').on('click','.moverPrev',function(){
	var the=$(this).parent().parent();
	Pagination.keyword=$('.search-box .search-key').val();
	Pagination.prev(the);
});
$('.pagination').on('click','.moveNext',function(){
	var the=$(this).parent().parent();
	Pagination.keyword=$('.search-box .search-key').val();
	Pagination.next(the);
});
$('.pagination').on('click','button:not(.no)',function(){
	var the=$(this).parent().parent();
	var This=this;
	Pagination.keyword=$('.search-box .search-key').val();
	Pagination.page(the,This);
});
$('.pagination').on('keydown','input.inPage',function(e){
	if(e.which==13){
		var the=$(this).parent().parent();
		Pagination.keyword=$('.search-box .search-key').val();
		Pagination.inputEnter(the);
	}
});
$('.pagination').on('click','.chosePage',function(){	
	var the=$(this).parent().parent();
	Pagination.keyword=$('.search-box .search-key').val();
	Pagination.inputEnter(the);
});	

$('.pagination').on('click','.maxData-submit',function(){
	var max=parseInt($('.pagination .maxData').val());
	if(!max||max<20||max>100){
		COMMON.alert('请在20-100范围之间选择每页显示的数据');
		return;
	}
	Pagination.count=max;
	Pagination.fun(1,Pagination.keyword,Pagination.count,'isMaxReset');
});