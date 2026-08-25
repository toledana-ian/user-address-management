package com.example.addressadmin;

import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.http.MediaType;
import org.springframework.test.web.servlet.MockMvc;

import static org.hamcrest.Matchers.hasKey;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.delete;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.post;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.put;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.header;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.jsonPath;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;

@SpringBootTest
@org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc
class UserControllerTest {
    @Autowired
    MockMvc mvc;

    @Test
    void updatesProfile() throws Exception {
        mvc.perform(put("/api/users/1")
                        .contentType(MediaType.APPLICATION_JSON)
                        .content("""
                                {"email":"maya.new@example.com","firstName":"Maya","lastName":"Chen-Smith"}
                                """))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.email").value("maya.new@example.com"))
                .andExpect(jsonPath("$.lastName").value("Chen-Smith"))
                .andExpect(jsonPath("$.addresses.length()").value(2));
    }

    @Test
    void createsAddressAtEndOfOrderedList() throws Exception {
        mvc.perform(post("/api/users/2/addresses")
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(addressJson("Vacation", "9 Ocean Drive")))
                .andExpect(status().isCreated())
                .andExpect(header().string("Location",
                        org.hamcrest.Matchers.matchesPattern("/api/users/2/addresses/\\d+")))
                .andExpect(jsonPath("$.label").value("Vacation"))
                .andExpect(jsonPath("$.line2").doesNotExist());
    }

    @Test
    void updatesAddress() throws Exception {
        mvc.perform(put("/api/users/1/addresses/101")
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(addressJson("Main home", "20 Garden Street")))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.id").value(101))
                .andExpect(jsonPath("$.label").value("Main home"))
                .andExpect(jsonPath("$.line1").value("20 Garden Street"));
    }

    @Test
    void deletesAddress() throws Exception {
        mvc.perform(delete("/api/users/3/addresses/105"))
                .andExpect(status().isNoContent());

        mvc.perform(delete("/api/users/3/addresses/105"))
                .andExpect(status().isNotFound());
    }

    @Test
    void returnsJsonWhenUserIsMissing() throws Exception {
        mvc.perform(put("/api/users/999")
                        .contentType(MediaType.APPLICATION_JSON)
                        .content("""
                                {"email":"valid@example.com","firstName":"Test","lastName":"User"}
                                """))
                .andExpect(status().isNotFound())
                .andExpect(jsonPath("$.status").value(404))
                .andExpect(jsonPath("$.message").value("User 999 was not found"))
                .andExpect(jsonPath("$.path").value("/api/users/999"));
    }

    @Test
    void returnsJsonWhenAddressIsMissing() throws Exception {
        mvc.perform(put("/api/users/1/addresses/999")
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(addressJson("Home", "1 Main Street")))
                .andExpect(status().isNotFound())
                .andExpect(jsonPath("$.status").value(404))
                .andExpect(jsonPath("$.message").value(
                        "Address 999 was not found for user 1"));
    }

    @Test
    void returnsFieldErrorsForInvalidInput() throws Exception {
        mvc.perform(post("/api/users/1/addresses")
                        .contentType(MediaType.APPLICATION_JSON)
                        .content("""
                                {"label":"","line1":"","city":"","state":"","postalCode":"","country":""}
                                """))
                .andExpect(status().isBadRequest())
                .andExpect(jsonPath("$.status").value(400))
                .andExpect(jsonPath("$.fieldErrors", hasKey("label")))
                .andExpect(jsonPath("$.fieldErrors", hasKey("line1")));
    }

    private String addressJson(String label, String line1) {
        return """
                {
                  "label":"%s",
                  "line1":"%s",
                  "line2":null,
                  "city":"Portland",
                  "state":"Oregon",
                  "postalCode":"97205",
                  "country":"United States"
                }
                """.formatted(label, line1);
    }
}
