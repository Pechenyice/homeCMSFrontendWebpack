import { Component } from "react";
import ErrorBoundaryContent from "./ErrorBoundaryContent";

interface State {
	hasError: boolean;
}

export class ErrorBoundary extends Component {
	public state: State = {
		hasError: false,
	};

	constructor(props: any) {
		super(props);
		this.state = { hasError: false };
	}

	static getDerivedStateFromError(error: any) {
		return { hasError: true };
	}

	componentDidCatch(error: any, errorInfo: any) {
		console.log("In ErrorBoundary: ", error, errorInfo);
	}

	render() {
		if (this.state.hasError) {
			return <ErrorBoundaryContent />;
		}

		return this.props.children;
	}
}
