package nl.avans.android.todos.domain;

import android.util.Log;

import org.joda.time.DateTime;
import org.joda.time.format.ISODateTimeFormat;
import org.json.JSONArray;
import org.json.JSONException;
import org.json.JSONObject;

import java.util.ArrayList;

/**
 * Deze class vertaalt JSON objecten naar (lijsten van) ToDos.
 */
public class ToDoMapper {

    // De JSON attributen die we uitlezen
    public static final String TODO_RESULT = "result";
    public static final String TODO_TITLE = "Titel";
    public static final String TODO_DESCRIPTION = "Beschrijving";
    public static final String TODO_UPDATED_AT = "LaatstGewijzigdOp";
    public static final String TODO_STATUS = "Status";

    /**
     * Map het JSON response op een arraylist en retourneer deze.
     */
    public static ArrayList<ToDo> mapToDoList(JSONObject response){

        ArrayList<ToDo> result = new ArrayList<>();

        try{
            JSONArray jsonArray = response.getJSONArray(TODO_RESULT);

            for(int i = 0; i < jsonArray.length(); i++){
                JSONObject jsonObject = jsonArray.getJSONObject(i);

                // Convert stringdate to Date
                String timestamp = jsonObject.getString(TODO_UPDATED_AT);
                DateTime todoDateTime = ISODateTimeFormat.dateTimeParser().parseDateTime(timestamp);

                ToDo toDo = new ToDo(
                    jsonObject.getString(TODO_TITLE),
                    jsonObject.getString(TODO_DESCRIPTION),
                    jsonObject.getString(TODO_STATUS),
                    todoDateTime
                );
                // Log.i("ToDoMapper", "ToDo: " + toDo);
                result.add(toDo);
            }
        } catch( JSONException ex) {
            Log.e("ToDoMapper", "onPostExecute JSONException " + ex.getLocalizedMessage());
        }
        return result;
    }
}
