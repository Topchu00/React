// class AppClass extends React.Component {

import { Button } from "./components/Button"
import { Footer } from "./components/Footer/footer"
import { Header } from "./components/Header/header"

// 	render() {
// 		return (
// 			<div>
// 				<h1>Hello, world!</h1>
// 			</div>
// 		)
// 	}
// }

function App() {
	return (
		<div>
			<Header />

			<Footer />
		</div>
	)
}

export default App
