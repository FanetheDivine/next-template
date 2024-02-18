import useSWR from "swr";

export function useTestState(){
    const testState = useSWR('test',()=>1)
    return testState
}