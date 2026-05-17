import java.io.*;
import java.net.*;

public class TestAPI {
    public static void main(String[] args) {
        try {
            URL url = new URL("https://api.frankfurter.app/latest?amount=10&from=USD&to=INR");
            HttpURLConnection con = (HttpURLConnection) url.openConnection();
            con.setRequestMethod("GET");
            System.out.println("Response Code: " + con.getResponseCode());
            BufferedReader in = new BufferedReader(new InputStreamReader(con.getInputStream()));
            String inputLine;
            StringBuilder content = new StringBuilder();
            while ((inputLine = in.readLine()) != null) content.append(inputLine);
            in.close();
            con.disconnect();
            System.out.println(content);
        } catch (Exception e) {
            e.printStackTrace();
        }
    }
}
