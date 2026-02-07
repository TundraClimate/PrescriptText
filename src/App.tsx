import { test_hello } from "wasm";

export default () => {
    return (
        <div>
            <p>{test_hello()}</p>
        </div>
    );
};
