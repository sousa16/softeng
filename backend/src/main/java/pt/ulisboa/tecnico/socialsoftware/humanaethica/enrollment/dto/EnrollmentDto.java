package pt.ulisboa.tecnico.socialsoftware.humanaethica.enrollment.dto;

import pt.ulisboa.tecnico.socialsoftware.humanaethica.enrollment.domain.Enrollment;
import pt.ulisboa.tecnico.socialsoftware.humanaethica.participation.domain.Participation;
import pt.ulisboa.tecnico.socialsoftware.humanaethica.utils.DateHandler;

public class EnrollmentDto {
    private Integer id;
    private String motivation;
    private String volunteerName;
    private boolean participating;
    private Integer volunteerId;

    private String enrollmentDateTime;

    private Integer activityId;

    public EnrollmentDto() {}

    public EnrollmentDto(Enrollment enrollment) {
        this.id = enrollment.getId();
        this.volunteerId = enrollment.getVolunteer().getId();
        this.motivation = enrollment.getMotivation();
        this.enrollmentDateTime = DateHandler.toISOString(enrollment.getEnrollmentDateTime());
        this.activityId = enrollment.getActivity().getId(); 
        this.volunteerName = enrollment.getVolunteer().getName();
        checkParticipating(enrollment);
    }

    public Integer getId() {
        return id;
    }

    public void setId(Integer id) {
        this.id = id;
    }

    public String getMotivation() {
        return motivation;
    }

    public void setMotivation(String motivation) {
        this.motivation = motivation;
    }

    public String getEnrollmentDateTime() {
        return enrollmentDateTime;
    }

    public void setEnrollmentDateTime(String enrollmentDateTime) {
        this.enrollmentDateTime = enrollmentDateTime;
    }

    public Integer getActivityId() {
        return activityId;
    }

    public void setActivityId(Integer activityId) {
        this.activityId = activityId;
    }
    public String getVolunteerName() {
        return volunteerName;
    }

    public Integer getVolunteerId() {
        return volunteerId;
    }

    public void setVolunteerId(Integer id) {
        this.volunteerId = id;
    }

    public void setVolunteerName(String volunteerName){ this.volunteerName = volunteerName; }

    public void setParticipating(boolean participating) { this.participating = participating; }

    public boolean getParticipating(){ return this.participating; }

    public void checkParticipating(Enrollment enrollment){
        int size = enrollment.getActivity().getParticipations().size();

        for (int i = 0; i < size; i++){
            Participation participation = enrollment.getActivity().getParticipations().get(i);
            int idActitiviyVolunteer = participation.getVolunteer().getId();
            int idEnrollmentVolunteer = enrollment.getVolunteer().getId();
            if(idActitiviyVolunteer == idEnrollmentVolunteer){
                setParticipating(true);
                return;
            }
        }
        setParticipating(false);
    }
}
