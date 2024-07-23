package com.ssafy.sayif.member.entity;

public enum Role {
    Mentor, Mentee, Admin;

    public static Role fromString(String roleString) {
        for (Role role : Role.values()) {
            if (role.name().equalsIgnoreCase(roleString)) {
                return role;
            }
        }
        throw new IllegalArgumentException("Invalid role: " + roleString);
    }
}
