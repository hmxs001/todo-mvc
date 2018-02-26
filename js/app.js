(function (angular) {
	'use strict';

	/**
	*
	*	MyTodoMvc Module
	*
	*	应用程序的主要的模块
	*/
	//1.为应用程序创建一个模块，用来管理界面的结构
	var myApp = angular.module("MyTodoMvc",[]);
	

	//2.注册一个主要的控制器（属于某个模块）,用于往视图( view )中暴露数据

	myApp.controller("MainController",["$scope",function($scope){
		
		//获取id(去除重复id)
		function getId(){
			var id=Math.random();
			for(var i=0;i<$scope.todos.length;i++){
				if($scope.todos[i].id===id){
					id=getId();
					break;
				}
			}
			return id;
		}
		
		
		//文本框需要一个模型，为了拿到文本输入的值
		$scope.text='哈密小生你好';

		//任务列表页需要一个
		//每一个任务的结构{id:1,text:'学习',completed:true}
		$scope.todos=[
			{id:1,text:'学习',completed:false},
			{id:2,text:'睡觉',completed:false},
			{id:3,text:'打豆豆',completed:true},
		];

		//添加todo
		$scope.add=function(){
			//没有输入不执行
			if(!$scope.text){
				return false;
			}
			$scope.todos.push({
				//自动增长?
				//id:$scope.todos.length+1,//删除的时候会有问题
				//id:Math.random(),
				id:getId(),
				//由于$scope.text是双向绑定的,add同时肯定可以拿到界面上的输入值
				text:$scope.text,
				completed:false
			});	
			//清空文本框
			$scope.text='';
		}
		
		//处理删除
		$scope.remove=function(id){
			//删除谁
			for(var i=0;i<$scope.todos.length;i++){
				if($scope.todos[i].id===id){
					$scope.todos.splice(i,1);
					break;		
				}
			}
		}

		//清空已完成
		$scope.clear=function(){
			var result = [];
			for(var i=0;i<$scope.todos.length;i++){
				if(!$scope.todos[i].completed){//保存未完成的
					//$scope.todos.splice(i,1);	//删除后数组的长度发生变化,不可这样写
					result.push($scope.todos[i]);
				}
			}
			$scope.todos=result;//只留下未完成的(completed->false)
		}

		//是否有已经完成的(ng-show接收true或者false)
		$scope.existCompleted=function(){
			//该函数一定要有返回值
			for(var i=0;i<$scope.todos.length;i++){
				if($scope.todos[i].completed){
					return true;
				}
			}
			return false;
		}

		//当前编辑哪个元素
		$scope.currentEditingId=-1;//-1代表肯定不存在的元素，默认没有任何被编辑
		$scope.editing=function(id){
			$scope.currentEditingId=id;
		}

		//停止编辑(form中ng-submit 按回车就会保存停止编辑)
		$scope.save=function(){
			$scope.currentEditingId=-1;
		}
		
		/*
		$scope.checkall=false;
		$scope.$watch("checkall",function(now,old){
			for(var i=0;i<$scope.todos.length;i++){
				$scope.todos[i].completed=now;
			}
		})
		*/
		
		//全选和全不选(勾选)
		var now=true;
		$scope.toggleAll=function(){
			for(var i=0;i<$scope.todos.length;i++){
				$scope.todos[i].completed=now;
			}
			now=!now;
		}
	}]);
})(angular);
