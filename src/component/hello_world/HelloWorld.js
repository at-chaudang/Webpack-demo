import React, { Component } from "react";
import styles from './hello_world.scss';

class HelloWorld extends Component {
	render() {
		return (
			<div className={styles.helloworld}>Hello World 1!</div>
		);
	}
}

export default HelloWorld;
