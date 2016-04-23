module Humanise (..) where

import Html exposing (Html)
import Html.Attributes exposing (..)
import Html.Events as Events
import Json.Decode as Json


convert : String -> String
convert regex =
    regex ++ "blah"


--- MODEL

type alias Model = 
    { human : String
    , regex : String
    }
    
initialModel : Model
initialModel =
    { human = "Type a regex to show its matchings"
    , regex = "" 
    }
    
type Action
    = NoOp
    | Update String
    

--- UPDATE

update : Action -> Model -> Model
update action model =
    case action of
        Update regex ->
            { model | human = "Matches a " ++ convert regex }
        
        NoOp ->
            model
            

--- VIEW

view : Signal.Address Action -> Model -> Html
view address model =
    Html.div
        [ class "container" ]
        [ Html.input
            [ class "input"
            , Events.on "input" Events.targetValue (Signal.message address << Update) 
            ]
            []
        , Html.p
            [ class "result"] 
            [ Html.text model.human ]
        ]