import React, { Component } from 'react';
import { AppRegistry,Fetch,Text,View,ListView} from "react-native";
import { styles } from './static/styles/style';

export default class AwesomProject extends Component {

	constructor(props) {
		super(props);
		this.ds = new ListView.DataSource({rowHasChanged:(r1,r2) => r1 !== r2});
		this.state = {
			cities: this.ds.cloneWithRows([])
		};
	}
	getData(url,suc,err) {
		return fetch(url)
		.then((response) => response.json())
		.then((responseData) => {
			console.log('printdata')
			console.log(responseData)
			suc(responseData.data)
			// if(data.errno == 0){
			// 	suc && suc(responseData.data)
			// }
		})
		.catch((e) => {
			console.log(e);
		});
	}
	componentDidMount() {
		var scope = this;
		this.getData('https://apikuai.baidu.com/city/getstartcitys',function(data) {
			console.log('printdata')
			scope.setState({
				cities: scope.ds.cloneWithRows(data.cities)
			});
			console.log(this.state.cities)
		});
	}
	onPressAction(data) {
		alert(data.cnname);
	}
	render() {
		return (
			<View style={styles.container}>
				<Text>这是一大段文本</Text>
        		<ListView style={styles.listView} enableEmptySections={true}
             		dataSource={this.state.cities}
             		renderRow={(rowData) =>
          				<View style={styles.listItem} >
							<Text onPress={() => this.onPressAction(rowData)}>{rowData.cnname}</Text>
              			</View>
					 }
				/>
			 </View>
		);
	}
}
  
AppRegistry.registerComponent('AwesomProject', () => AwesomProject);

