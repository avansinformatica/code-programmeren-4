package nl.avans.android.todos.domain;

import android.content.Context;
import android.util.Log;
import android.view.LayoutInflater;
import android.view.View;
import android.view.ViewGroup;
import android.widget.BaseAdapter;
import android.widget.TextView;

import java.util.ArrayList;

import nl.avans.android.todos.R;

public class ToDoAdapter extends BaseAdapter {

    private final String TAG = this.getClass().getSimpleName();

    private Context mContext;
    private LayoutInflater mInflator;
    private ArrayList<ToDo> bolToDoArrayList;

    public ToDoAdapter(Context context, LayoutInflater layoutInflater, ArrayList<ToDo> bolToDoArrayList) {
        this.mContext = context;
        this.mInflator = layoutInflater;
        this.bolToDoArrayList = bolToDoArrayList;
    }

    @Override
    public int getCount() {
        int size = bolToDoArrayList.size();
        Log.i(TAG, "getCount() = " + size);
        return size;
    }

    @Override
    public Object getItem(int position) {
        Log.i(TAG, "getItem() at " + position);
        return bolToDoArrayList.get(position);
    }

    @Override
    public long getItemId(int position) {
        return position;
    }

    @Override
    public View getView(int position, View convertView, ViewGroup parent) {
        Log.i(TAG, "getView at " + position);

        ViewHolder viewHolder;

        if(convertView == null){

            Log.i(TAG, "convertView is NULL - nieuwe maken");

            // Koppel de convertView aan de layout van onze eigen row
            convertView = mInflator.inflate(R.layout.list_to_do_row, null);

            // Maak een ViewHolder en koppel de schermvelden aan de velden uit onze eigen row.
            viewHolder = new ViewHolder();
            viewHolder.textViewTitle = (TextView) convertView.findViewById(R.id.rowToDoTitle);
            // viewHolder.textViewContents = (TextView) convertView.findViewById(R.id.rowToDoDate);

            // Sla de viewholder op in de convertView
            convertView.setTag(viewHolder);
        } else {
            Log.i(TAG, "convertView BESTOND AL - hergebruik");
            viewHolder = (ViewHolder) convertView.getTag();
        }

        ToDo bolToDo = bolToDoArrayList.get(position);
        viewHolder.textViewTitle.setText(bolToDo.getTitle());

        return convertView;
    }

    private static class ViewHolder {
        public TextView textViewTitle;
        // public TextView textViewContents;
    }
}

