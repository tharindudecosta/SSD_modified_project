import { useGlobalState } from "../utils";

const CallGlobalState = () => {
    const [userId] = useGlobalState("userId");
console.log(userId);
    return userId;
};

export {CallGlobalState};
