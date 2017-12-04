TODAY
Rendering (permeating from logic layer)
//Turn
set all
WAS WORKING ON RENDERWATER

## ACTIONS
# GGENERAL
1. select mesh -> select entity -> determine possible actions
2. push down possible entity actions' to inputlayer
3. capture input / exit (action may have multiple pushes)
4. validate action
5. Push action to player action stack
5. create ghost

## TURNS
# Object

GameID:
turnID:
turnNo:
resolves : []

# Receive turn 
1. Clear all action buffers 
2. Enact all received resolves
3. set timer for last call / server expected turn container

# Commit
Commit automatically when timer goes off or when user commits
1. send player actionstack
2. await resolve
3. 

NEXT
Turnsystem
Netcode