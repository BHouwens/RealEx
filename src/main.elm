module Main (..) where

import Html exposing (Html)
import Humanise as Humanise
import StartApp.Simple


--- MODEL 

type alias AppModel =
    { humaniseModel : Humanise.Model
    }

initialModel : AppModel
initialModel =
    { humaniseModel = Humanise.initialModel
    }
    
    

--- UPDATE

type Action
    = HumaniseAction Humanise.Action
            
update : Action -> AppModel -> AppModel
update action model =
    case action of
        HumaniseAction subAction ->
            let
                updateHumaniseModel =
                    Humanise.update subAction model.humaniseModel
            in
                { model | humaniseModel = updateHumaniseModel }
        
    
--- VIEW 
    
view : Signal.Address Action -> AppModel -> Html
view address model =
    Html.div
        []
        [ Humanise.view (Signal.forwardTo address HumaniseAction) model.humaniseModel ]
            
main : Signal.Signal Html
main =
    StartApp.Simple.start
        { model = initialModel
        , view = view
        , update = update 
        }