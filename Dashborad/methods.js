/**
 *  Predictor for ExitInterchange from model/610811ab9193b9173300dcec
 *  Predictive model by BigML - Machine Learning Made Easy
 */
function predictExitinterchange(
	day,
	entranceinterchange,
	event,
	hour,
	mins,
	type
) {
	if (entranceinterchange == null) {
		return 4.23857;
	} else if (entranceinterchange > 2) {
		if (entranceinterchange > 3) {
			return 5;
		} else if (entranceinterchange <= 3) {
			return 4.50033;
		}
	} else if (entranceinterchange <= 2) {
		if (entranceinterchange > 1) {
			if (hour == null) {
				return 3.98044;
			} else if (hour > 5) {
				if (day == null) {
					return 3.99419;
				} else if (day == "Tuesday") {
					if (hour > 11) {
						if (mins == null) {
							return 3.86702;
						} else if (mins > 48) {
							return 3.5;
						} else if (mins <= 48) {
							if (mins > 28) {
								return 4.09459;
							} else if (mins <= 28) {
								if (hour > 12) {
									if (hour > 16) {
										return 4;
									} else if (hour <= 16) {
										return 3.5625;
									}
								} else if (hour <= 12) {
									return 4.42857;
								}
							}
						}
					} else if (hour <= 11) {
						if (type == null) {
							return 4.27778;
						} else if (type == "Truck") {
							return 5;
						} else if (type != "Truck") {
							if (event == null) {
								return 4.07143;
							} else if (event == "Regular") {
								return 5;
							} else if (event != "Regular") {
								return 3.91667;
							}
						}
					}
				} else if (day != "Tuesday") {
					if (type == null) {
						return 4.01026;
					} else if (type == "Motorcycle") {
						if (day == "Thursday") {
							return 4.39024;
						} else if (day != "Thursday") {
							if (day == "Saturday") {
								return 4.31034;
							} else if (day != "Saturday") {
								if (mins == null) {
									return 4;
								} else if (mins > 57) {
									return 3.375;
								} else if (mins <= 57) {
									if (mins > 43) {
										return 4.26316;
									} else if (mins <= 43) {
										if (mins > 38) {
											return 3.5;
										} else if (mins <= 38) {
											if (hour > 16) {
												if (mins > 36) {
													return 5;
												} else if (mins <= 36) {
													return 4.08824;
												}
											} else if (hour <= 16) {
												if (mins > 29) {
													return 3.46667;
												} else if (mins <= 29) {
													if (hour > 13) {
														return 3.7561;
													} else if (hour <= 13) {
														return 4.26316;
													}
												}
											}
										}
									}
								}
							}
						}
					} else if (type != "Motorcycle") {
						return 3.98573;
					}
				}
			} else if (hour <= 5) {
				if (day == null) {
					return 3.86076;
				} else if (day == "Thursday") {
					return 3.55;
				} else if (day != "Thursday") {
					return 3.9058;
				}
			}
		} else if (entranceinterchange <= 1) {
			if (type == null) {
				return 3.50315;
			} else if (type == "Family") {
				if (mins == null) {
					return 3.39068;
				} else if (mins > 40) {
					if (mins > 46) {
						if (hour == null) {
							return 3.42857;
						} else if (hour > 13) {
							return 3.11538;
						} else if (hour <= 13) {
							return 3.64865;
						}
					} else if (mins <= 46) {
						return 4.03125;
					}
				} else if (mins <= 40) {
					if (event == null) {
						return 3.2663;
					} else if (event == "Holiday") {
						if (hour == null) {
							return 3.51316;
						} else if (hour > 14) {
							return 3.15789;
						} else if (hour <= 14) {
							return 3.86842;
						}
					} else if (event != "Holiday") {
						if (day == null) {
							return 3.09259;
						} else if (day == "Monday") {
							return 2.75;
						} else if (day != "Monday") {
							if (day == "Saturday") {
								return 2.84211;
							} else if (day != "Saturday") {
								if (hour == null) {
									return 3.26087;
								} else if (hour > 15) {
									if (mins > 21) {
										return 3.93333;
									} else if (mins <= 21) {
										if (mins > 17) {
											return 2;
										} else if (mins <= 17) {
											return 3.5;
										}
									}
								} else if (hour <= 15) {
									if (hour > 10) {
										if (mins > 12) {
											return 2.5;
										} else if (mins <= 12) {
											if (day == "Tuesday") {
												return 3;
											} else if (day != "Tuesday") {
												return 5;
											}
										}
									} else if (hour <= 10) {
										return 3.47368;
									}
								}
							}
						}
					}
				}
			} else if (type != "Family") {
				if (mins == null) {
					return 3.52716;
				} else if (mins > 40) {
					if (type == "Truck") {
						if (hour == null) {
							return 3.59;
						} else if (hour > 13) {
							return 3.80357;
						} else if (hour <= 13) {
							return 3.31818;
						}
					} else if (type != "Truck") {
						if (hour == null) {
							return 3.38006;
						} else if (hour > 15) {
							if (mins > 47) {
								return 2.85294;
							} else if (mins <= 47) {
								return 3.46939;
							}
						} else if (hour <= 15) {
							if (mins > 47) {
								if (mins > 57) {
									return 3.24138;
								} else if (mins <= 57) {
									if (day == null) {
										return 3.64228;
									} else if (day == "Sunday") {
										if (event == null) {
											return 3.15385;
										} else if (event == "Regular") {
											return 3.83333;
										} else if (event != "Regular") {
											return 2.57143;
										}
									} else if (day != "Sunday") {
										if (hour > 4) {
											if (day == "Tuesday") {
												return 3.29412;
											} else if (day != "Tuesday") {
												if (type == "Motorcycle") {
													if (day == "Saturday") {
														return 2;
													} else if (
														day != "Saturday"
													) {
														return 3.70833;
													}
												} else if (
													type != "Motorcycle"
												) {
													return 4.03846;
												}
											}
										} else if (hour <= 4) {
											if (mins > 50) {
												return 3.5;
											} else if (mins <= 50) {
												return 2;
											}
										}
									}
								}
							} else if (mins <= 47) {
								if (day == null) {
									return 3.2093;
								} else if (day == "Tuesday") {
									return 3.88889;
								} else if (day != "Tuesday") {
									if (day == "Wednesday") {
										if (hour > 14) {
											return 5;
										} else if (hour <= 14) {
											return 3.44444;
										}
									} else if (day != "Wednesday") {
										return 2.96491;
									}
								}
							}
						}
					}
				} else if (mins <= 40) {
					if (mins > 36) {
						if (hour == null) {
							return 3.77143;
						} else if (hour > 18) {
							return 4.18182;
						} else if (hour <= 18) {
							if (hour > 14) {
								return 3.31034;
							} else if (hour <= 14) {
								return 3.85185;
							}
						}
					} else if (mins <= 36) {
						if (mins > 23) {
							if (day == null) {
								return 3.43793;
							} else if (day == "Tuesday") {
								return 3.04545;
							} else if (day != "Tuesday") {
								if (event == null) {
									return 3.50813;
								} else if (event == "Holiday") {
									if (day == "Sunday") {
										return 3.9;
									} else if (day != "Sunday") {
										return 3.19118;
									}
								} else if (event != "Holiday") {
									if (type == "Bus") {
										return 3.325;
									} else if (type != "Bus") {
										if (day == "Wednesday") {
											return 4.04545;
										} else if (day != "Wednesday") {
											if (hour == null) {
												return 3.63208;
											} else if (hour > 21) {
												return 4.25;
											} else if (hour <= 21) {
												return 3.58163;
											}
										}
									}
								}
							}
						} else if (mins <= 23) {
							if (hour == null) {
								return 3.611;
							} else if (hour > 20) {
								return 3.40678;
							} else if (hour <= 20) {
								if (day == null) {
									return 3.63889;
								} else if (day == "Thursday") {
									return 3.43103;
								} else if (day != "Thursday") {
									if (hour > 2) {
										if (day == "Wednesday") {
											return 3.45;
										} else if (day != "Wednesday") {
											if (hour > 16) {
												return 4;
											} else if (hour <= 16) {
												if (mins > 22) {
													return 4.5;
												} else if (mins <= 22) {
													return 3.68724;
												}
											}
										}
									} else if (hour <= 2) {
										return 3.2;
									}
								}
							}
						}
					}
				}
			}
		}
	}
	return null;
}

function predictTable(data) {
	var ans = new Array(25).fill(null);

	if (Object.keys(data).length > 1) {
		select = data["select"];
		time = data["time"];
		semicolon = time.indexOf(":");
		space = time.indexOf(" ");

		var x = Math.round(
			predictExitinterchange(
				select[2],
				select[0],
				null,
				time.substring(0, semicolon),
				time.substring(semicolon + 1, space),
				select[1]
			)
		);
		ans[5 * (select[0] - 1) + x - 1] = "X";
		return ans;
	} else return ans;
}

function predictValues(data) {
	if (Object.keys(data).length > 1) {
		select = data["select"];
		time = data["time"];

		return [select[0], select[1], select[2], time];
	} else return 0;
}

module.exports = { predictExitinterchange, predictTable, predictValues };
