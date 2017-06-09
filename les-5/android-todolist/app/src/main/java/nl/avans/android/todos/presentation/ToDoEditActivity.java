package nl.avans.android.todos.presentation;

import android.content.Intent;
import android.support.design.widget.FloatingActionButton;
import android.support.v7.app.AppCompatActivity;
import android.os.Bundle;
import android.util.Log;
import android.view.MenuItem;
import android.view.View;
import android.widget.TextView;

import java.util.ArrayList;

import nl.avans.android.todos.R;
import nl.avans.android.todos.domain.ToDo;
import nl.avans.android.todos.service.ToDoRequest;

import static nl.avans.android.todos.presentation.MainActivity.TODO_DATA;

public class ToDoEditActivity extends AppCompatActivity implements View.OnClickListener {

    private TextView textTitle;
    private TextView textContents;

    public final String TAG = this.getClass().getSimpleName();

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_to_do_edit);

        textTitle = (TextView) findViewById(R.id.textEditToDoTitle);
        textContents = (TextView) findViewById(R.id.textEditToDoContents);

        FloatingActionButton fab = (FloatingActionButton) findViewById(R.id.fabSaveNewToDo);
        fab.setOnClickListener(this);

        // See if there's any extras for us.
        // We could use this Activity for both new ToDos
        // and for editing existing ToDos
        Bundle extras = getIntent().getExtras();
        if(extras != null) {
            ToDo toDo = (ToDo) extras.getSerializable(TODO_DATA);
            Log.i(TAG, toDo.toString());

            textTitle.setText(toDo.getTitle());
            textContents.setText(toDo.getContents());
        }
    }

    @Override
    public boolean onOptionsItemSelected(MenuItem item) {
        int id = item.getItemId();
        if (id == android.R.id.home) {
            finish(); // or go to another activity
            return true;
        }
        return super.onOptionsItemSelected(item);
    }

    /**
     * Saving the new ToDo
     * We return a ToDo object to the caller (MainActivity) for further handling.
     *
     * @param v
     */
    @Override
    public void onClick(View v) {
        // Save new ToDo and return to the previous Activity.
        ToDo newToDo = new ToDo(textTitle.getText().toString(), textContents.getText().toString());

        // We return our data to the MainActivity for further handling.
        Intent iData = new Intent();
        iData.putExtra( MainActivity.TODO_DATA, newToDo );

        // Tell the caller that everyting is OK.
        setResult( android.app.Activity.RESULT_OK, iData );

        // ..returns us to the parent "MainActivity"..
        finish();
    }
}
