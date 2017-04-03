
public class Main {

    public static void main(String[] args) {

        System.out.println("hello ");
        try {
            Thread.sleep(2000);
        } catch (InterruptedException ex) {
            Thread.currentThread().interrupt();
        }
        System.out.println("world");

    }
}


