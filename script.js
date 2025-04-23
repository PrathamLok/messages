const SUPABASE_URL = "https://ukpogkbquuchdhkmrona.supabase.co";
const SUPABASE_KEY = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InVrcG9na2JxdXVjaGRoa21yb25hIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDUzMDQwMTMsImV4cCI6MjA2MDg4MDAxM30.S0rwUCeAOfRFkXoEx33_ZB6MTyz_6g6qBtW9YH6NE3c"
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InlhcGZnaWZkbnd2anJvYXpoY3NrIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDIxMzYxMDksImV4cCI6MjA1NzcxMjEwOX0.MIFOoETXzoZDP_bnvXsNL1ce12R7S5-l4J5glRPUjMI";
const supabaseClient = supabase.createClient(SUPABASE_URL, SUPABASE_KEY);

// Listen for form submission
document.getElementById("contactForm").addEventListener("submit", async (e) => {
  e.preventDefault(); // Prevent the default form submission

  // Get values from the form fields
  const name = document.getElementById("name").value.trim();
  const email = document.getElementById("email").value.trim();
  const message = document.getElementById("message").value.trim();

  // Basic validation check
  if (!name || !email || !message) {
    document.getElementById("formResponse").textContent =
      "Please fill out all fields.";
    return;
  }

  // Insert the contact data into the "contacts" table in your database
  try {
    let { data, error } = await supabaseClient
      .from("contacts")
      .insert([{ name, email, message }]);

    if (error) throw error;

    document.getElementById("formResponse").textContent =
      "Thank you for reaching out! Your message has been sent.";

    // Clear the form after successful submission
    document.getElementById("contactForm").reset();
  } catch (err) {
    console.error("Error submitting form:", err);
    document.getElementById("formResponse").textContent =
      "An error occurred. Please try again later.";
  }
});
