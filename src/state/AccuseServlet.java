package state;

import java.io.*;
import javax.servlet.*;
import javax.servlet.http.*;
import java.util.*;

public class AccuseServlet extends HttpServlet  {
	
	 @Override
	   public void doGet(HttpServletRequest request, HttpServletResponse response)
	               throws IOException, ServletException {
	      // Set the response message's MIME type
	      response.setContentType("text/html;charset=UTF-8"); 
	      // Allocate a output writer to write the response message into the network socket
	      PrintWriter out = response.getWriter();
	      
	      /**	      out.println("<script type=\"text/javascript\">");
	      out.println("alert('deadbeef');");  
	      out.println("</script>");
	      */
	      
	      try {
	          out.println("<!DOCTYPE html>");
	          out.println("<html><head>");
	          out.println("<meta http-equiv='Content-Type' content='text/html; charset=UTF-8'>");
	          out.println("<title>Accuse Servlet</title></head>");
	          
	          String type = request.getParameter("type");
	          if (type.equals("suggest"))
	          out.println("<body><h2>You have Suggested!</h2>");
	          
	          if (type.equals("accuse"))
		          out.println("<body><h2>You have Accused!</h2>");
	  
	          // Retrieve the value of the query parameter "suspectList" (from pull-down menu)
	          String suspect = request.getParameter("suspectList");
	          if (suspect == null) {
	             out.println("<p>Suspect: MISSING</p>");
	          } else if (suspect.equals("Colonel Mustard")) {
	             out.println("<p>Suspect: Colonel Mustard</p>");
	          } else if (suspect.equals("Miss Scarlet")) {
	             out.println("<p>Suspect: Miss Scarlet</p>");
	          } else if (suspect.equals("Professor Plum")) {
		             out.println("<p>Suspect: Professor Plum</p>");
		      } else if (suspect.equals("Mr. Green")) {
		             out.println("<p>Suspect: Mr. Green</p>");
		      } else if (suspect.equals("Mrs. White")) {
		             out.println("<p>Suspect: Mrs. White</p>");
		      } else if (suspect.equals("Mrs. Peacock")) {
		             out.println("<p>Suspect: Mrs. Peacock</p>");
		      }

	          // Retrieve the value of the query parameter "suspectList" (from pull-down menu)
	          String weapon = request.getParameter("weaponList");
	          if (weapon == null) {
	             out.println("<p> Weapon: MISSING</p>");
	          } else if (weapon.equals("Knife")) {
	             out.println("<p>Weapon: Knife</p>");
	          } else if (weapon.equals("Rope")) {
	             out.println("<p>Weapon: Rope</p>");
	          } else if (weapon.equals("Lead Pipe")) {
		             out.println("<p>Weapon: Lead Pipe</p>");
		      } else if (weapon.equals("Candlestick")) {
		             out.println("<p>Weapon: Candlestick</p>");
		      } else if (weapon.equals("Wrench")) {
		             out.println("<p>Weapon: Wrench</p>");
		      }
	          
	       // Retrieve the value of the query parameter "suspectList" (from pull-down menu)
	          String location = request.getParameter("locationList");
	          if (location == null) {
	             out.println("<p>Location: MISSING</p>");
	          } else if (location.equals("Study")) {
	             out.println("<p>Location: Study</p>");
	          } else if (location.equals("Hall")) {
	             out.println("<p>Location: Hall</p>");
	          } else if (location.equals("Lounge")) {
		             out.println("<p>Location: Lounge</p>");
		      } else if (location.equals("Library")) {
		             out.println("<p>Location: Library</p>");
		      } else if (location.equals("Billiard Room")) {
		             out.println("<p>Location: Billiard Room</p>");
		      } else if (location.equals("Dining Room")) {
		             out.println("<p>Location: Dining Room</p>");
		      } else if (location.equals("Conservatory")) {
		             out.println("<p>Location: Conservatory</p>");
		      } else if (location.equals("Ballroom")) {
		             out.println("<p>Location: Ballroom</p>");
		      } else if (location.equals("Kitchen")) {
		             out.println("<p>Location: Kitchen</p>");
		      }	          
	  
	        
	          // Get all the names of request parameters
	          Enumeration names = request.getParameterNames();
	          out.println("<p>Request Parameter Names are: ");
	          if (names.hasMoreElements()) {
	             out.print(htmlFilter(names.nextElement().toString()));
	          }
	          do {
	             out.print(", " + htmlFilter(names.nextElement().toString()));
	          } while (names.hasMoreElements());
	          out.println(".</p>");
	  
	          // Hyperlink "BACK" to input page
	          out.println("<a href='index2.html'>BACK</a>");
	  
	          out.println("</body></html>");
	       } finally {
	          out.close();  // Always close the output writer
	       }
	    }
	  
	    // Redirect POST request to GET request.
	    @Override
	    public void doPost(HttpServletRequest request, HttpServletResponse response)
	                throws IOException, ServletException {
	       doGet(request, response);
	    }
	  
	    // Filter the string for special HTML characters to prevent
	    // command injection attack
	    private static String htmlFilter(String message) {
	       if (message == null) return null;
	       int len = message.length();
	       StringBuffer result = new StringBuffer(len + 20);
	       char aChar;
	  
	       for (int i = 0; i < len; ++i) {
	          aChar = message.charAt(i);
	          switch (aChar) {
	              case '<': result.append("&lt;"); break;
	              case '>': result.append("&gt;"); break;
	              case '&': result.append("&amp;"); break;
	              case '"': result.append("&quot;"); break;
	              default: result.append(aChar);
	          }
	       }
	       return (result.toString());
	    }

}
