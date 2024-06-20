import { gql } from '@apollo/client'

export const GET_CONTINENTS = gql`
    query {
        continents {
            code
            name
        }
    }
`
export const GET_COUNTRIES = gql`
    query {
        countries {
            name
            code
            capital
            awsRegion
            currencies
            phones
            continent {
                name
                code
            }
            languages {
                name
            }
            states {
                name
            }
        }
    }
`
