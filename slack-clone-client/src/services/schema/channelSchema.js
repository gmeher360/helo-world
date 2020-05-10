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