package nl.avans.android.todos.domain;

import org.joda.time.DateTime;

import java.io.Serializable;

public class ToDo implements Serializable {

    private String title;
    private String contents;
    private String status;
    private DateTime updatedAt;

    public ToDo(String title, String contents) {
        this.title = title;
        this.contents = contents;
        this.status = null;
        this.updatedAt = new DateTime();
    }

    public ToDo(String title, String contents, String status, DateTime updatedAt) {
        this.title = title;
        this.contents = contents;
        this.status = status;
        this.updatedAt = updatedAt;
    }

    public String getTitle() {
        return title;
    }

    public void setTitle(String title) {
        this.title = title;
    }

    public String getContents() {
        return contents;
    }

    public void setContents(String contents) {
        this.contents = contents;
    }

    public String getStatus() {
        return status;
    }

    public void setStatus(String status) {
        this.status = status;
    }

    public DateTime getUpdatedAt() {
        return updatedAt;
    }

    public void setUpdatedAt(DateTime updatedAt) {
        this.updatedAt = updatedAt;
    }

    @Override
    public String toString() {
        return "ToDo{" +
                "title='" + title + '\'' +
                ", contents='" + contents + '\'' +
                ", status='" + status + '\'' +
                ", updatedAt=" + updatedAt +
                '}';
    }
}
