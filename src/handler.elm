module RegexHandler (..) where

import Regex exposing (..)

{- Module contains a bunch of useful functions that are 
   used together in order to convert from regex to human
   readable text
-}

bracketHandler : String -> String
bracketHandler bracketed =
    let
        range = replace All (regex "\]\[") (\_ -> "") bracketed
        numbers = find All (regex "[-0-9]") range
        chars = find All (regex "[^a-zA-Z0-9]") range
        letters = find All (regex "[-a-zA-Z]") range
            
   

     