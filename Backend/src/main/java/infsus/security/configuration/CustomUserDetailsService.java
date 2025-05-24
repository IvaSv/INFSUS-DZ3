package infsus.security.configuration;

import infsus.users.entity.User;
import infsus.users.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Service
public class CustomUserDetailsService implements UserDetailsService {

    @Autowired
    private UserRepository userRepository;


    @Override
    public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {

        String email = username;
        Optional<User> userInfo = Optional.ofNullable(userRepository.findUserByEmail(email));

        return userInfo.map(user -> {
                    System.out.println("User found: " + username);
                    UserInfoUserDetails returnUser = new UserInfoUserDetails(user);
                    System.out.println("UserInfoUserDetails " + returnUser.getUsername() + " " + returnUser.getAuthorities());
                    return returnUser;
                })
                .orElseThrow(() -> {
                    System.out.println("User not found: " + username);
                    return new UsernameNotFoundException("User not found: " + username);
                });

    }

}
