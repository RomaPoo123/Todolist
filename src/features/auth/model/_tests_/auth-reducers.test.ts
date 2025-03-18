import { authReducer, InitialStateType, setIsInitialized, setIsLoggedIn } from "../authSlice";

let startState: InitialStateType;

beforeEach(() => {
    // start Data
    startState = {
        isLoggedIn: true,
        isInitialized: true
    }
});

test("verification of login changes", () => {

    const endState = authReducer(startState, setIsLoggedIn({ isLoggedIn: false }));

    expect(endState.isLoggedIn).toBe(false);
    expect(endState.isInitialized).toBe(true)

});

test("verification of Initialized changes", () => {

    const endState = authReducer(startState, setIsInitialized({ isInitialized: false }));

    expect(endState.isInitialized).toBe(false);
    expect(endState.isLoggedIn).toBe(true);

});
