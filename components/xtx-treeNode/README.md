## 适用于组织架构的基础展示

使用
```
<xtx-treeNode :list="list" @change="treeChange"></xtx-treeNode>
```
list数据结构
```
list: [{
	id: '1',
	name: '机构一',
	children: [
		{
			id: '101',
			name: '人事部',
			children: []
		},{
			id: '102',
			name: '总部',
			children: [
				{
					id: '1021',
					name: '选项一',
					children: []
				},{
					id: '1022',
					name: '选项二',
					children: []
				},{
					id: '1023',
					name: '选项三',
					children: []
				}
			]
		},{
			id: '103',
			name: '后勤部',
			children: []
		}
	]
},{
	id: '12',
	name: '机构二',
	children: [
		{
			id: '10121',
			name: '选项一',
			children: []
		},{
			id: '10122',
			name: '选项二',
			children: []
		},{
			id: '10123',
			name: '选项三',
			children: []
		}
	]
},{
	id: '13',
	name: '机构三',
	children: [{
		id: '10131',
		name: '选项一',
		children: []
	},{
		id: '10132',
		name: '选项二',
		children: []
	},{
		id: '10133',
		name: '选项三',
		children: []
	}]
}]
```
## 事件说明

| 事件名 | 说明 | 回调 |
| ------- | ------- | ------- |
|   change  |   点击node节点触发  |   ({ id: '10131', name: '选项一', children: []})=>{}    |