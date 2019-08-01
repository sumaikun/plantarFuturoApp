import {fromJS} from 'immutable'

export const loadState = () => {
  try {
    const serializedData = localStorage.getItem('state')
    if (serializedData === null){
      return undefined // Si no existe el state en el local storage devolvemos undefined para que cargue el state inicial que hayamos definido
    }
    return fromJS(JSON.parse(serializedData)) // Si encontramos con exito nuestro storage lo devolvemos.
  } catch (error) {
    return undefined // Si ocurre algun error, devuelvo undefined para cargar el state inicial.
  }
}
export const saveState = (state) => {
  try {
    ////console.log(state);
    if(state.navigation.currentPagekey)
    {
      let storeState = {
        appState: state.appState,
        navigationIndex: state.navigation.currentPagekey,
        memory: state.memory,
      }


      if(window.cordova) {

        let serializedAppState = JSON.stringify(fromJS(storeState.appState).toJS());

        //console.log(serializedAppState);

        let serializedMemoryState = JSON.stringify(fromJS(storeState.memory).toJS());

        //console.log(serializedMemoryState);

        //console.log(storeState.navigationIndex);

        let db ;

        db = window.sqlitePlugin.openDatabase({
           name: 'my.db',
           location: 'default',
         },function(db){

           console.log("save in database");

           db.transaction(function(tx) {

                tx.executeSql("update app_state set json_data = ? , navigationIndex = ? where id = ? ", [serializedAppState,storeState.navigationIndex,1], function (resultSet) {

                    console.log("App state saved");
                    console.log(resultSet);

                }, function(error) {
                  console.log('INSERT APP STATE error: ');
                  console.log(error);
                });

                tx.executeSql("update memory_state set json_data = ? where id = ? ", [serializedMemoryState,1], function (resultSet) {

                    console.log("Memory state saved");
                    console.log(resultSet);

                }, function(error) {
                  console.log('INSERT APP STATE error: ');
                  console.log(error);
                });

            }, function(error) {
              console.log('TRANSACTION STATE error: ');
              console.log(error);
            }/*,
            function() {
               // OK to close here:
               console.log('Close Db');
               db.close(function() {
                 console.log('database is closed ok');
               });
             }*/
          );
         },error=>
         {
           console.log("error opening connection");
           console.log(error)
         });

        /*try{
          window.NativeStorage.setItem("state",serializedData,null,null);
        }catch(error){
          console.log(error);
        }*/
      }
      else{

        let serializedData = JSON.stringify(fromJS(storeState).toJS());

        localStorage.setItem('state', serializedData)
      }

    }

    ////console.log(localStorage.getItem('state'));
  } catch (error) {
    //console.log("error salvando el estado");
    console.error(error);
    ////console.log(state);
	// Acá podemos capturar o crear cualquier log que deseemos en caso de que falle el salvado en el storage.
  }
}
