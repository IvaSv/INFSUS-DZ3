package infsus.driving.hours.repository;

import infsus.driving.hours.entity.DrivingHours;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface DrivingHoursRepository extends JpaRepository<DrivingHours, Long> {

    @Query("SELECT dh FROM DrivingHours dh WHERE dh.user_id = :userId")
    List<DrivingHours> findAllByUserId(@Param("userId") Long userId);

    @Query("SELECT COUNT(d) FROM DrivingHours d WHERE d.user_id = :userId AND d.id = :fieldId")
    int countByUserIdAndFieldId(@Param("userId") Long userId, @Param("fieldId") Long fieldId);



}
