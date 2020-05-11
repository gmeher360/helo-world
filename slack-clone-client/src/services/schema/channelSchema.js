import { gql } from "@apollo/client";


export const GET_ALL_CHANNELS_BY_TEAM_ID = gql`
    query($teamId:Int!){
        getAllChannelsByTeamId(teamId:$teamId){
            ok
            channels{
                id
                name
            }
            errors{
                path
                message
            }
        }
    }
`
export const CREATE_CHANNEL = gql`
    mutation($teamId: Int!,$name: String!,){
        createChannel(teamId: $teamId, name: $name){
            ok
            errors{
                path
                message
            }
            channel{
                id,
                name
            }
        }
    }
`