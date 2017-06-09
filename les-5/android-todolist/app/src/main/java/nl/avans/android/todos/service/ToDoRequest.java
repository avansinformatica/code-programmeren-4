package nl.avans.android.todos.service;

import android.content.Context;
import android.content.SharedPreferences;
import android.util.Base64;
import android.util.Log;

import com.android.volley.AuthFailureError;
import com.android.volley.DefaultRetryPolicy;
import com.android.volley.NetworkResponse;
import com.android.volley.Request;
import com.android.volley.Response;
import com.android.volley.VolleyError;
import com.android.volley.toolbox.JsonObjectRequest;

import org.json.JSONException;
import org.json.JSONObject;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.Map;

import nl.avans.android.todos.R;
import nl.avans.android.todos.domain.ToDo;
import nl.avans.android.todos.domain.ToDoMapper;

/**
 * Deze class handelt requests naar de API server af. De JSON objecten die we terug krijgen
 * worden door de ToDoMapper vertaald naar (lijsten van) ToDo items.
 */
public class ToDoRequest {

    private Context context;
    public final String TAG = this.getClass().getSimpleName();

    // De aanroepende class implementeert deze interface.
    private ToDoRequest.ToDoListener listener;

    /**
     * Constructor
     *
     * @param context
     * @param listener
     */
    public ToDoRequest(Context context, ToDoRequest.ToDoListener listener) {
        this.context = context;
        this.listener = listener;
    }

    /**
     * Verstuur een GET request om alle ToDo's op te halen.
     */
    public void handleGetAllToDos() {

        Log.i(TAG, "handleGetAllToDos");

        // Haal het token uit de prefs
        SharedPreferences sharedPref = context.getSharedPreferences(
                context.getString(R.string.preference_file_key), Context.MODE_PRIVATE);
        final String token = sharedPref.getString(context.getString(R.string.saved_token), "dummy default token");
        if(token != null && !token.equals("dummy default token")) {

            Log.i(TAG, "Token gevonden, we gaan het request uitvoeren");
            JsonObjectRequest jsObjRequest = new JsonObjectRequest(
                    Request.Method.GET,
                    Config.URL_TODOS,
                    null,
                    new Response.Listener<JSONObject>() {
                        @Override
                        public void onResponse(JSONObject response) {
                            // Succesvol response
                            Log.i(TAG, response.toString());
                            ArrayList<ToDo> result = ToDoMapper.mapToDoList(response);
                            listener.onToDosAvailable(result);
                        }
                    },
                    new Response.ErrorListener() {
                        @Override
                        public void onErrorResponse(VolleyError error) {
                            // handleErrorResponse(error);
                            Log.e(TAG, error.toString());
                        }
                    }) {
                @Override
                public Map<String, String> getHeaders() throws AuthFailureError {
                    Map<String, String> headers = new HashMap<>();
                    headers.put("Content-Type", "application/json");
                    headers.put("Authorization", "Bearer " + token);
                    return headers;
                }
            };

            // Access the RequestQueue through your singleton class.
            VolleyRequestQueue.getInstance(context).addToRequestQueue(jsObjRequest);
        }
    }

    /**
     * Verstuur een POST met nieuwe ToDo.
     */
    public void handlePostToDo(final ToDo newTodo) {

        Log.i(TAG, "handlePostToDo");

        // Haal het token uit de prefs
        // TODO Verplaats het ophalen van het token naar een centraal beschikbare 'utility funtion'
        SharedPreferences sharedPref = context.getSharedPreferences(
                context.getString(R.string.preference_file_key), Context.MODE_PRIVATE);
        final String token = sharedPref.getString(context.getString(R.string.saved_token), "dummy default token");
        if(token != null && !token.equals("dummy default token")) {

            //
            // Maak een JSON object met username en password. Dit object sturen we mee
            // als request body (zoals je ook met Postman hebt gedaan)
            //
            String body = "{\"Titel\":\"" + newTodo.getTitle() + "\",\"Beschrijving\":\"" + newTodo.getContents() + "\"}";

            try {
                JSONObject jsonBody = new JSONObject(body);
                Log.i(TAG, "handlePostToDo - body = " + jsonBody);
                JsonObjectRequest jsObjRequest = new JsonObjectRequest(
                        Request.Method.POST,
                        Config.URL_TODOS,
                        jsonBody,
                        new Response.Listener<JSONObject>() {
                            @Override
                            public void onResponse(JSONObject response) {
                                Log.i(TAG, response.toString());
                                // Het toevoegen is gelukt
                                // Hier kun je kiezen: of een refresh door de hele lijst op te halen
                                // en de ListView bij te werken ... Of alleen de ene update toevoegen
                                // aan de ArrayList. Wij doen dat laatste.
                                listener.onToDoAvailable(newTodo);
                            }
                        },
                        new Response.ErrorListener() {
                            @Override
                            public void onErrorResponse(VolleyError error) {
                                // Error - send back to caller
                                listener.onToDosError(error.toString());
                            }
                        }){
                    @Override
                    public Map<String, String> getHeaders() throws AuthFailureError {
                        Map<String, String> headers = new HashMap<>();
                        headers.put("Content-Type", "application/json");
                        headers.put("Authorization", "Bearer " + token);
                        return headers;
                    }
                };

                // Access the RequestQueue through your singleton class.
                VolleyRequestQueue.getInstance(context).addToRequestQueue(jsObjRequest);
            } catch (JSONException e) {
                Log.e(TAG, e.getMessage());
                listener.onToDosError(e.getMessage());
            }
        }
    }

    //
    // Callback interface - implemented by the calling class (MainActivity in our case).
    //
    public interface ToDoListener {
        // Callback function to return a fresh list of ToDos
        void onToDosAvailable(ArrayList<ToDo> toDos);

        // Callback function to handle a single added ToDo.
        void onToDoAvailable(ToDo todo);

        // Callback to handle serverside API errors
        void onToDosError(String message);
    }

}


