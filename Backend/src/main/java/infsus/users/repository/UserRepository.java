package infsus.users.repository;


import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;
import infsus.users.entity.User;

import java.util.List;

@Repository
public interface UserRepository extends JpaRepository<User, Long> {

    User findUserByEmail(String email);

    @Query(value = "SELECT * FROM users WHERE id = :userid", nativeQuery = true)
    User findByUserId(@Param("userid") Long userid);

    @Query(value = "SELECT * FROM users WHERE role = :role", nativeQuery = true)
    List<User> findAllByRole(@Param("role") String role);

    @Query("SELECT u FROM User u WHERE u.role.name = :roleName")
    List<User> findAllByRoleName(@Param("roleName") String roleName);



}
